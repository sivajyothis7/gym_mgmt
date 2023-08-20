// Copyright (c) 2023, siva and contributors
// For license information, please see license.txt

frappe.ui.form.on('Class Details', {
	refresh: function(frm) {
		trainerStatus(frm);

	}
});

function trainerStatus(frm) {
    if (frm.doc.trainer && frm.doc.trainer.active === 'Active') {
        frm.set_query('trainer', function() {
            return {
                filters: [
                    ['Gym Trainer', 'name', '=', frm.doc.trainer]
                ]
            };
        });
    } else {
        frm.set_query('trainer', function() {
            return {
                filters: [
                    ['Gym Trainer', 'active', '=', 'Inactive']
                ]
            };
        });
    }
}