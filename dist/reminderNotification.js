"use strict";
function scheduleNotification(evt) {
    if (evt.reminder && !isNaN(Number(evt.reminder))) {
        const reminderTimeInMinutes = Number(evt.reminder);
        const eventStartTime = new Date(evt.initialDate).getTime();
        const currentTime = new Date().getTime();
        const reminderTime = eventStartTime - reminderTimeInMinutes * 60000;
        if (reminderTime > currentTime) {
            const timeoutDuration = reminderTime - currentTime;
            setTimeout(() => {
                alert(Reminder, $, { evt, : .title }, starts in $, { reminderTimeInMinutes }, minutes.);
            }, timeoutDuration);
        }
    }
}
