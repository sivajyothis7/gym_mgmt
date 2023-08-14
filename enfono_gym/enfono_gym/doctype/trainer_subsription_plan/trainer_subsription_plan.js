// Copyright (c) 2023, siva and contributors
// For license information, please see license.txt

frappe.ui.form.on('Trainer Subsription Plan', {
	start_date: function (frm) {
        updateEndDate(frm);
	},	
	end_date: function (frm) {
		updateDaysLeft(frm)
		updatePlanDays(frm)
    },
	plan_days: function(frm){
		updatePlanDays(frm)
		calcPlanFees(frm);
	},      
	     
    day_fee: function(frm){
        calcPlanFees(frm);
    }
});
function updateDaysLeft(frm) {
    if (frm.doc.start_date && frm.doc.end_date) {
        frappe.call({
			method:"enfono_gym.enfono_gym.doctype.trainer_subsription_plan.trainer_subsription_plan.get_days_left_in_plan",
            args: {
                start_date: frm.doc.start_date,
                end_date: frm.doc.end_date
            },
            callback: function (response) {
                if (response.message) {
                    frm.set_value('days_left', response.message);
                }
            }
        });
    }
}
function updatePlanDays(frm) {
    if (frm.doc.start_date && frm.doc.end_date) {
        frappe.call({
			method:"enfono_gym.enfono_gym.doctype.trainer_subsription_plan.trainer_subsription_plan.get_total_plan_day",
            args: {
                start_date: frm.doc.start_date,
                end_date: frm.doc.end_date
            },
            callback: function (response) {
                if (response.message) {
                    frm.set_value('plan_days', response.message);
                }
            }
        });
    }
}
function calcPlanFees(frm){
	if (frm.doc.plan_days && frm.doc.day_fee) {
        let total_plan_days_fees = frm.doc.plan_days * frm.doc.day_fee;
        frm.set_value('total_plan_days_fees', total_plan_days_fees);
    }
}