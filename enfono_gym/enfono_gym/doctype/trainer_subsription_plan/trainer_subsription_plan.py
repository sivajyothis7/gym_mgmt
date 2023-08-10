# Copyright (c) 2023, siva and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import getdate, date_diff

class TrainerSubsriptionPlan(Document):
	pass

# @frappe_whitelist()
def get_days_left_in_plan(start_date,end_date):
	days_left=date_diff(end_date,start_date)
	return days_left

# @frappe_whitelist()
def get_total_plan_day(start_date,end_date):
    days=date_diff(end_date,start_date)
    return days