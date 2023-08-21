// Copyright (c) 2023, siva and contributors
// For license information, please see license.txt

frappe.ui.form.on('Class Details', {
	refresh: function(frm) {
		trainerStatus(frm);

	}
});

function trainerStatus(frm) {
    if (frm.doc.trainer && frm.doc.trainer.active === 1) {  // Assuming active is represented as 1 in the checkbox
        frm.set_query('trainer', function() {
            return {
                filters: [
                    ['Gym Trainer', 'active', '=', 1]
                ]
            };
        });
    } else {
        frm.set_query('trainer', function() {
            return {
                filters: [
                    ['Gym Trainer', 'active', '=', 1]  // Filter out active trainers
                ]
            };
        });
    }
}