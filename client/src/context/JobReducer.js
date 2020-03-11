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

const randomPercentage = () => {
    return Math.floor(Math.random() * 100) + 20;
};
export default (state, action) => {
    let mailbox = action.payload;
    switch (action.type) {
        case "DISCOVER_USER":
            setTimeout(() => {
                mailbox.migrationStatus = "Discovered";
                mailbox.mailboxSize = randomDataSize();
                mailbox.itemCount = randomItemCount();

                API.updateMailbox(mailbox);
                console.log(state);
                return {
                    ...state,
                    mailboxJob: [...state.mailboxJob, mailbox]
                };
            }, 5000);

        case "QUEUE_MIGRATION":
            mailbox.migrationStatus = "Job Queued";
            API.updateMailbox(mailbox);
            return {
                ...state,
                mailboxJob: [...state.mailboxJob, mailbox]
            };
        case "START_MIGRATION":
            setTimeout(() => {
                mailbox.migrationStatus = "Completed";

                API.updateMailbox(mailbox);
                return {
                    ...state,
                    mailboxJob: [...state.mailboxJob, mailbox]
                };
            }, 5000);
        case "STOP_MIGRATION":
            setTimeout(() => {
                mailbox.migrationStatus = `Stopped (${randomPercentage()}%)`;

                API.updateMailbox(mailbox);
                return {
                    ...state,
                    mailboxJob: [...state.mailboxJob, mailbox]
                };
            }, 5000);
        case "ARCHIVE_MIGRATION":
            setTimeout(() => {
                mailbox.migrationStatus = "Archived";

                API.updateMailbox(mailbox);
                return {
                    ...state,
                    mailboxJob: [...state.mailboxJob, mailbox]
                };
            }, 5000);
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
