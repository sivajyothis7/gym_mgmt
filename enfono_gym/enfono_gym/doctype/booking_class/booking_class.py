# Copyright (c) 2023, siva and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.website.website_generator import WebsiteGenerator
from frappe.utils import cint

class BookingClass(Document):

    def before_save(self):
        self.validate_booking()

    def validate_booking(self):
        if self.slot_capacity:
            slot = cint(self.slot_capacity) - 1
            booking_instance = frappe.get_doc("Class Details", self.class_data)
            
            if slot < 0:
                frappe.throw("No available slots in this class")
            
            booking_instance.available_capacity = slot
            booking_instance.save()
            frappe.msgprint("Slot Updated Successfully")

   