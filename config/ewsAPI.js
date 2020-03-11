const EWS = require("node-ews");

module.exports = {
    migrateMessageTest: function(source, target) {
        console.log(source);
        console.log(target);
    },
    collectInboxStats: async function(source, cb) {
        const sourceConfig = {
            username: source.adminEmail,
            password: source.adminPassword,
            host: "https://outlook.office365.com",
            auth: "basic"
        };

        const sourceEnv = new EWS(sourceConfig);

        const findItem = "FindItem";

        // define ews api function args
        const findItemArgs = {
            attributes: {
                Traversal: "Shallow"
            },
            ParentFolderIds: {
                DistinguishedFolderId: {
                    attributes: {
                        Id: "inbox"
                    }
                }
            },
            ItemShape: {
                BaseShape: "AllProperties",
                IncludeMimeContent: true,
                BodyType: "Best",
                ConvertHtmlCodePageToUTF8: false,
                FilterHtmlContent: false
            },
            IndexedPageViewItemView: {
                attributes: {
                    MaxEntriesReturned: 5,
                    BasePoint: "Beginning",
                    Offset: 0
                }
            }
        };

        sourceEnv.run(findItem, findItemArgs).then(result => {
            // console.log(result);
            cb(
                result.ResponseMessages.FindItemResponseMessage.RootFolder
                    .attributes.TotalItemsInView
            );
        });
    },
    migrateMessage: function(source, target, cb, total, current) {
        console.log(source);
        console.log(target);
        // exchange server connection info
        const sourceConfig = {
            username: source.adminEmail,
            password: source.adminPassword,
            host: "https://outlook.office365.com",
            auth: "basic"
        };
        const targetConfig = {
            username: target.adminEmail,
            password: target.adminPassword,
            host: "https://outlook.office365.com",
            auth: "basic"
        };

        //defines next page of results
        const nextpage = current + 1;

        // initialize node-ews
        const sourceEnv = new EWS(sourceConfig);
        const targetEnv = new EWS(targetConfig);

        // define ews api function
        const findItem = "FindItem";

        // define ews api function args
        const findItemArgs = {
            attributes: {
                Traversal: "Shallow"
            },
            ParentFolderIds: {
                DistinguishedFolderId: {
                    attributes: {
                        Id: "inbox"
                    }
                }
            },
            ItemShape: {
                BaseShape: "AllProperties",
                IncludeMimeContent: true,
                BodyType: "Best",
                ConvertHtmlCodePageToUTF8: false,
                FilterHtmlContent: false
            },
            IndexedPageViewItemView: {
                attributes: {
                    MaxEntriesReturned: 5,
                    BasePoint: "Beginning",
                    Offset: 0
                }
            }
        };

        //Find Messages for a given mailbox
        sourceEnv
            .run(findItem, findItemArgs)
            .then(result => {
                // console.log(result.ResponseMessages.FindItemResponseMessage.RootFolder.Items.Message[0]);
                const messages = result.ResponseMessages.FindItemResponseMessage.RootFolder.Items.Message.slice(
                    current,
                    nextpage
                );

                messages.forEach(message => {
                    console.log(
                        `Migrating MessageID: ${message.ItemId.attributes.Id}`
                    );

                    // define ews api function args
                    const getItemArgs = {
                        ItemIds: {
                            ItemId: {
                                attributes: {
                                    Id: message.ItemId.attributes.Id
                                }
                            }
                        },
                        ItemShape: {
                            BaseShape: "AllProperties",
                            IncludeMimeContent: true,
                            BodyType: "Best",
                            ConvertHtmlCodePageToUTF8: false,
                            FilterHtmlContent: false
                        }
                    };

                    sourceEnv
                        .run("GetItem", getItemArgs)
                        .then(result => {
                            // console.log(result.ResponseMessages.GetItemResponseMessage.Items.Message)
                            const {
                                ItemClass,
                                Subject,
                                Body,
                                Attachments,
                                Sender,
                                ToRecipients,
                                CcRecipients,
                                BccRecipients,
                                From,
                                IsRead
                            } = result.ResponseMessages.GetItemResponseMessage.Items.Message;

                            const createArgs = {
                                attributes: {
                                    MessageDisposition: "SaveOnly"
                                },
                                Items: {
                                    Message: {
                                        ItemClass: ItemClass,
                                        Subject: Subject,
                                        From: From,
                                        CcRecipients: CcRecipients,
                                        BccRecipients: BccRecipients,
                                        Body: Body,
                                        ToRecipients: ToRecipients,
                                        IsRead: IsRead,
                                        Sender: Sender,
                                        ExtendedProperty: {
                                            ExtendedFieldURI: {
                                                attributes: {
                                                    PropertyTag: "3591",
                                                    PropertyType: "Integer"
                                                }
                                            },
                                            Value: "1"
                                        }
                                    }
                                },
                                SavedItemFolderId: {
                                    DistinguishedFolderId: {
                                        attributes: {
                                            Id: "inbox"
                                        }
                                    }
                                }
                            };
                            targetEnv
                                .run("CreateItem", createArgs)
                                .then(result => {
                                    console.log(result);
                                    cb(total, nextpage);
                                })
                                .catch(err => {
                                    console.log(
                                        `ERROR COPYING TO TARGET:${err.message}`
                                    );
                                    cb(total, nextpage);
                                });
                        })
                        .catch(err => {
                            console.log(
                                `ERROR GETTING MESSAGE CONTENT:${err.message}`
                            );
                            cb(total, nextpage);
                        });
                });
            })
            .catch(err => {
                console.log(`ERROR GETTING MESSAGES:${err.message}`);
                cb(total, nextpage);
            });
    }
};
