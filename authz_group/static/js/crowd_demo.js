function cancel_handle(ev) {
    console.log("Cancel for: ", ev.target);
}

function save_handle(instance, ids) {
    console.log("Save for: ", $(instance).parent());
}

$(".crowds_demo").crowd_control().on('cancel', cancel_handle).on('save', save_handle);
