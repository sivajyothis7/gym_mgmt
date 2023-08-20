frappe.ui.form.on('Membership', {
    refresh: function(frm) {
        frm.add_custom_button(__('Booking Locker'), function() {
            frappe.new_doc("Booking Locker", { locker: frm.doc.locker, member:frm.doc.member })
        });
    },
    plan: function (frm) {
        frm.set_value('price', planPrice(frm.doc.plan));
        updateEndDate(frm);
    },
    start_date: function (frm) {
        updateEndDate(frm);
        updateContractStatus(frm);
    },
    end_date: function (frm) {
        // calculateDaysLeft(frm);
        updateContractStatus(frm);
        updateDaysLeft(frm)
    }
});
function planPrice(plan) {
    if (plan === "Monthly") {
        return 600;
    } else if (plan === "Six-month") {
        return 1200;
    } else {
        return 1800;
    }
}
function updateEndDate(frm) {
    if (frm.doc.plan && frm.doc.start_date) {
        let end_date = calculateEndDate(frm.doc.plan, frm.doc.start_date);
        frm.set_value('end_date', end_date);
    }
}
function calculateEndDate(plan, start_date) {
    if (plan === "Monthly") {
        return frappe.datetime.add_days(start_date, 30);
    } else if (plan === "Six-month") {
        return frappe.datetime.add_days(start_date, 180);
    } else {
        return frappe.datetime.add_days(start_date, 365);
    }
}
// function calculateDaysLeft(frm){
//  if(frm.doc.start_date && frm.doc.end_date){
//      let days_left = frappe.datetime.get_diff(frm.doc.end_date, frm.doc.start_date);
//         frm.set_value('days_left', days_left);
//  }
// }
function updateContractStatus(frm) {
    if (frm.doc.start_date && frm.doc.end_date) {
        frappe.call({
            method:"enfono_gym.enfono_gym.doctype.membership.membership.get_contract_status",
            args: {
                start_date: frm.doc.start_date,
                end_date: frm.doc.end_date
            },
            callback: function (response) {
                if (response.message) {
                    frm.set_value('status', response.message);
                }
            }
        });
    }
}
function updateDaysLeft(frm) {
    if (frm.doc.start_date && frm.doc.end_date) {
        frappe.call({
            method:"enfono_gym.enfono_gym.doctype.membership.membership.get_days_left_in_plan",
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

















