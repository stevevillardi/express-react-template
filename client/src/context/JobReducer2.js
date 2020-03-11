import API from "../utils/API";

const randomItemCount = () => {
    return Math.floor(Math.random() * 15000) + 200;
};

const randomDataSize = () => {
    const precision = 100; // 2 decimals
    const randomnum =
        Math.floor(
            Math.random() * (10 * precision - 1 * precision) + 1 * precision
        ) /
        (1 * precision);
    return `${randomnum}GB`;
};
export default async (state, action) => {
    let mailbox = action.payload;
    switch (action.type) {
        case "DISCOVER_USER":
            let discoverPromise = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    mailbox.migrationStatus = "Discovery Completed";
                    mailbox.mailboxSize = randomDataSize();
                    mailbox.itemCount = randomItemCount();

                    API.updateMailbox(mailbox);
                    console.log(state);
                    resolve({
                        ...state,
                        mailboxJob: [...state.mailboxJob, mailbox]
                    });
                }, 500);
            });
            console.log(discoverPromise);
            return discoverPromise;
        case "QUEUE_MIGRATION":
            mailbox.migrationStatus = "Job Queued";
            API.updateMailbox(mailbox);
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };
        case "START_MIGRATION":
            mailbox.migrationStatus = "Not Started";
            mailbox.mailboxSize = "0.00GB";
            mailbox.itemCount = 0;

            API.updateMailbox(mailbox);
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };
        case "STOP_MIGRATION":
            mailbox.migrationStatus = "Not Started";
            mailbox.mailboxSize = "0.00GB";
            mailbox.itemCount = 0;

            API.updateMailbox(mailbox);
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };
        case "ARCHIVE_MIGRATION":
            mailbox.migrationStatus = "Not Started";
            mailbox.mailboxSize = "0.00GB";
            mailbox.itemCount = 0;

            API.updateMailbox(mailbox);
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };
        case "RESET_MIGRATION":
            mailbox.migrationStatus = "Not Started";
            mailbox.mailboxSize = "0.00GB";
            mailbox.itemCount = 0;

            API.updateMailbox(mailbox);
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
