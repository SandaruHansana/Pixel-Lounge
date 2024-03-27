if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}

function ready() {

    let total_price = localStorage.getItem("LKR");
    document.getElementById("display_total").textContent = total_price;


    document.getElementById("bill_reset").addEventListener("click", function() {
        reset_billing_address();
    });
    document.getElementById("edit_address").addEventListener("click", function() {
        edit_billng_address();
    });
    document.getElementById("contact_reset").addEventListener("click", function() {
        reset_contact_details();
    });
    document.getElementById("edit_contact").addEventListener("click", function() {
        edit_contact_deatils();
    });
    document.getElementById("bill_submit").addEventListener("click", function() {
        save_billing_address();
        check_form_completion();
    });
    document.getElementById("contact_submit").addEventListener("click", function() {
        save_contact_details();
        check_form_completion();

    });
    document.getElementById("cardnum").addEventListener("input", function() {
        this.value = this.value.replace(/[a-zA-Z]/g, "");
    });
    document.getElementById("cardnum").addEventListener("blur", function() {
        if (this.value.length < 16) {
            alert("Please enter valid credit card number with 16 digits")
        }
    });
    document.getElementById("cardname").addEventListener("input", function() {
        this.value = this.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
    });
    document.getElementById("sec_code").addEventListener("change", function() {
        if (this.value > 999) {
            this.value = 999;
        } else if (this.value < 000) {
            this.value = null;
        }
        if (this.value.length < 3) {
            this.value = this.value.padStart(3, 0);
        }
    });

    for (let i = 0; i < document.getElementById("billing_address_form").getElementsByTagName("input").length; i++) {
        document.getElementById("billing_address_form").getElementsByTagName("input")[i].addEventListener("input", function() {
            formatting();
        });
    }
}

function reset_billing_address() {
    const inputs = document.getElementById("billing_address_form").querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = null;
    }
    document.getElementById("billing_address_form").querySelector("select").selectedIndex = 2;
}

function edit_billng_address() {
    document.getElementById("billing_address_form").style.display = "inline";
    document.getElementById("display_address").style.display = "none";
}

function save_billing_address() {
    document.getElementById("billing_address_form").style.display = "none";
    check_billing_address();
}

function check_billing_address() {
    const inputs = document.getElementById("billing_address_form").querySelectorAll("input");
    const error_msg = document.getElementById("display_address").querySelectorAll("p")[0];
    const address_info = document.getElementById("display_address").querySelectorAll("p")[1];
    if (inputs[0].value == "" || inputs[3].value == "" || inputs[5].value == "") {
        address_info.innerText = "";
        error_msg.innerText = "Please fill this required field";

    } else {
        address_info.innerText = inputs[0].value + ", " + inputs[3].value + ", " + inputs[5].value;
        error_msg.innerText = "";
    }
    document.getElementById("display_address").style.display = "block";
}

function reset_contact_details() {
    const inputs = document.getElementById("contact_details_form").querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = null;
    }
}

function edit_contact_deatils() {
    document.getElementById("contact_details_form").style.display = "inline";
    document.getElementById("display_email").style.display = "none";

}

function save_contact_details() {
    document.getElementById("contact_details_form").style.display = "none";
    check_contact_deatil();
}

function check_contact_deatil() {
    const inputs = document.getElementById("contact_details_form").querySelectorAll("input");
    const error_msg = document.getElementById("display_email").querySelectorAll("p")[0];
    const email_info = document.getElementById("display_email").querySelectorAll("p")[1];
    if (inputs[1].value == "") {
        email_info.innerText = "";
        error_msg.innerText = "Please fill this required field";

    } else {
        email_info.innerText = inputs[1].value;
        error_msg.innerText = "";
    }
    document.getElementById("display_email").style.display = "block";
}

function formatting() {
    const format_area = document.getElementById("billing_address_form").getElementsByTagName("input");
    for (let i = 0; i < format_area.length; i++) {
        const input = format_area[i];
        input.value = input.value.toUpperCase();
    }
}

function check_form_completion() {
    const inputs1 = document.getElementById("billing_address_form").querySelectorAll("input");
    const inputs2 = document.getElementById("contact_details_form").querySelectorAll("input");
    if (inputs1[0].value == "" || inputs1[3].value == "" || inputs1[5].value == "" || inputs2[1].value == "") {
        document.getElementById("make_payment").style.opacity = 0.7;
        document.getElementById("make_payment").disabled = true;
    } else {
        document.getElementById("make_payment").style.opacity = 1;
        document.getElementById("make_payment").disabled = false;
    }
}