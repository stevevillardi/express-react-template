import API from "../utils/API";

export default (state, action) => {
    let mailbox = action.payload;
    switch (action.type) {
        case "DISCOVER_USER":
            // mailbox.migrationStatus = "Discovered";
            // mailbox.mailboxSize = randomDataSize();
            // mailbox.itemCount = randomItemCount();

            // API.updateMailbox(mailbox);
            API.processJob(mailbox, "discover");
            // console.log(state);
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };

        case "QUEUE_MIGRATION":
            mailbox.migrationStatus = "In Progress";
            API.updateMailbox(mailbox);
            // API.processJob(mailbox, "queue");
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };
        case "INPROGRESS_MIGRATION":
            mailbox.migrationStatus = "InProgress";
            API.processJob(mailbox, "inprogress");
            // API.processJob(mailbox, "queue");
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };
        case "START_MIGRATION":
            // mailbox.migrationStatus = "Completed";

            // API.updateMailbox(mailbox);
            API.processJob(mailbox, "start");
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };

        case "STOP_MIGRATION":
            // mailbox.migrationStatus = `Stopped (${randomPercentage()}%)`;

            // API.updateMailbox(mailbox);
            API.processJob(mailbox, "stop");
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };

        case "ARCHIVE_MIGRATION":
            // mailbox.migrationStatus = "Archived";

            // API.updateMailbox(mailbox);
            API.processJob(mailbox, "archive");
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };

        case "RESET_MIGRATION":
            // mailbox.migrationStatus = "Not Started";
            // mailbox.mailboxSize = "0.00GB";
            // mailbox.itemCount = 0;

            // API.updateMailbox(mailbox);
            API.processJob(mailbox, "reset");
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };
        case "MIGRATION_ERROR":
            console.log(action.payload);
            break;
        default:
            return state;
    }
};
