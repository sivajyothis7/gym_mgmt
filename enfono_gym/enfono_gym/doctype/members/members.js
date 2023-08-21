frappe.ui.form.on("Members", {
    refresh: function (frm) {
        frm.add_custom_button(__('Create Membership'), function () {
            let d = new frappe.ui.Dialog({
                title: 'Select Plan',
                fields: [
                    {
                        fieldtype: "Select",
                        label: __("Create Membership"),
                        fieldname: "plan",
                        options: ["Monthly", "Six-months", "Annually"],
                        reqd: 1
                    }
                ],
                size: 'small',
                primary_action_label: 'Create',
                primary_action: (values) => {
                    frappe.new_doc("Membership", { member: frm.doc.name, plan: values.plan })
                    
                }
            })

            d.show();
        });

        frm.add_custom_button(__('Trainer Subscription Plan'), function () {
                    frappe.new_doc("Trainer Subsription Plan", { member:frm.doc.last_name })
                   
            

            
        });
    }
});
