# Copyright (c) 2023, siva and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import getdate, date_diff
from frappe.model.document import Document

class Membership(Document):
	def status(self):
		return get_contract_status(self.start_date,self.end_date)
	
@frappe.whitelist()
def get_contract_status(start_date,end_date):
	today= getdate()
	start= getdate(start_date)
	end= getdate(end_date)

	if end < today:
		return "Expired"
	elif start > today:
		return "Not Started"
	else:
		return "Active"


@frappe.whitelist()
def get_days_left_in_plan(start_date,end_date):
	days_left=date_diff(end_date,start_date)
	return days_left

