//making sure the document body is loaded before the javascript
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}

function ready() {

    check_if_cart_empty();

    document.getElementById("btn1").addEventListener("click", function() {
        add_to_cart(1, "LKR 24900", "url('../images/sample.jpg')", "Virtual Reality Headset");
    });
    document.getElementById("btn2").addEventListener("click", function() {
        add_to_cart(2, "LKR 28450", "url('../images/home_theatre.jpg')", "Home Theatre System");
    });
    document.getElementById("btn3").addEventListener("click", function() {
        add_to_cart(3, "LKR 13000", "url('../images/projector.jpg')", "Portable Movie Projector");
    });
    document.getElementById("btn4").addEventListener("click", function() {
        add_to_cart(4, "LKR 4550", "url('../images/headphones.jpg')", "Bluetooth Headset");
    });
    document.getElementById("btn5").addEventListener("click", function() {
        add_to_cart(5, "LKR 28900", "url('../images/Blu-ray.jpg')", "Blu-Ray DVD Player");
    });
    document.getElementById("btn6").addEventListener("click", function() {
        add_to_cart(6, "LKR 18500", "url('../images/3d.jpg')", "3D Vision Kit");
    });
    document.getElementById("btn7").addEventListener("click", function() {
        add_to_cart(7, "LKR 82800", "url('../images/nintendo.jpg')", "Nintendo Switch");
    });
    document.getElementById("btn8").addEventListener("click", function() {
        add_to_cart(8, "LKR 38000", "url('../images/chair.jpg')", "Gaming Chair");
    });

    document.getElementById("empty").addEventListener("click", function() {
        remove_all_cards();
        check_if_cart_empty();
    });
    document.getElementById("checkout").addEventListener("click", function() {
        let total_price = document.getElementById("LKR").textContent;
        localStorage.setItem("LKR", total_price);
        remove_all_cards();
        check_if_cart_empty();
    });
}



function add_to_cart(button_number, item_price, image_url, item_name) {

    //checking wether a card was already created or not
    const element = document.getElementById(`rmv_btn${button_number}`);
    if (!element) {

        //creating the content inside the "other" class div
        const button = document.createElement("button");
        button.classList.add("remove");
        button.setAttribute("id", `rmv_btn${button_number}`)
        button.textContent = "Remove";

        const input = document.createElement("input");
        input.classList.add("quantity");
        input.setAttribute("type", "number");
        input.value = 1;

        //creating the "other" class div
        const other = document.createElement("div");
        other.classList.add("other");

        //appending the "other" class div
        other.append(input);
        other.append(button);

        //creating the "price" div
        const price = document.createElement("div");
        price.classList.add("price_tag");
        price.textContent = item_price;

        //creating the "item_name" idv
        const name = document.createElement("div");
        name.classList.add("item_name");
        name.textContent = item_name;

        //creating the "image" div
        const image = document.createElement("div");
        image.classList.add("image");
        image.style.backgroundImage = image_url;
        image.style.backgroundSize = "100%";

        //creating the "hidden_card" div
        const card = document.createElement("div");
        card.classList.add("hidden_cards");
        card.setAttribute("id", `hcard${button_number}`)

        //appending the "hidden_card" div
        card.append(image);
        card.append(name);
        card.append(price);
        card.append(other);

        //creating the "hidden_card_holder" div
        const holder = document.getElementsByClassName("hidden_card_holder")[0];

        //appending the "hidden_card_holder" div
        holder.append(card);

        //removing the created "hidden_cards" using a remove button
        remove_card(button_number);

        value_change();

        update_total();

        check_if_cart_empty();
    }

}

function remove_card(button_number) {
    //removing the created "hidden_cards" using a remove button
    document.getElementById(`rmv_btn${button_number}`).addEventListener("click", function() {
        document.getElementById(`rmv_btn${button_number}`).parentElement.parentElement.remove();
        check_if_cart_empty();
        update_total();
    });
}



function update_total() {
    let total = 0;
    const current_cart_cards = document.getElementsByClassName("hidden_cards");
    for (let i = 0; i < current_cart_cards.length; i++) {
        const each_card = current_cart_cards[i];
        const price_tag = each_card.getElementsByClassName("price_tag")[0].textContent;
        const price_value = parseFloat(price_tag.substring(4));
        let quantity = each_card.getElementsByClassName("quantity")[0].value;
        if (quantity < 1) {
            quantity = 1;
            each_card.getElementsByClassName("quantity")[0].value = 1;
        }
        total += (price_value * quantity);
    }
    document.getElementById("LKR").textContent = "LKR " + total + ".00";
}

function value_change() {
    const current_quantity_inputs = document.getElementsByClassName("quantity");
    for (let i = 0; i < current_quantity_inputs.length; i++) {
        const each_input = current_quantity_inputs[i];
        each_input.addEventListener("change", function() {
            update_total();
        })
    }
}

function check_if_cart_empty() {
    const empty = document.getElementsByClassName("hidden_cards");
    if (empty.length === 0) {
        document.getElementById("cart_btns").style.display = "none";
        document.getElementById("show_total").style.display = "none";
        document.getElementById("hidden_card_holder").style.backgroundImage = "url('Student1 Images/empty_cart.png')";
    } else {
        document.getElementById("cart_btns").style.display = "grid";
        document.getElementById("show_total").style.display = "grid";
        document.getElementById("hidden_card_holder").style.backgroundImage = "none";
    }
}

function remove_all_cards() {
    const current_cart_cards = document.getElementsByClassName("hidden_cards");
    while (current_cart_cards.length > 0) {
        current_cart_cards[0].remove();
    }
    update_total();
}