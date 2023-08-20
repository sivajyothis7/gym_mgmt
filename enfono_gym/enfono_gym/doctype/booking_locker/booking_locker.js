// Copyright (c) 2023, siva and contributors
// For license information, please see license.txt

frappe.ui.form.on('Booking Locker', {
	from_date: function (frm) {
        
	},	
	to_date: function (frm) {
		calcDays(frm)
			
		
    },
	days: function(frm){
		totalLockerFees(frm)
		totalLockerFees(frm)
		
		
	},         
	locker_fee:function(frm){
		totalLockerFees(frm)
		
	},
});
function calcDays(frm){
	if(frm.doc.from_date && frm.doc.to_date){
		let days = frappe.datetime.get_diff(frm.doc.to_date, frm.doc.from_date);
        frm.set_value('days', days);
	}
}
function totalLockerFees(frm){
	if(frm.doc.locker_fee && frm.doc.days){
		let locker_fees = frm.doc.locker_fee * frm.doc.days;
		frm.set_value('locker_fees', locker_fees);
	}
}

