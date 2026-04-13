const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

fetch(url)
.then(res => res.json())
.then(data => {

    let meals = data.meals;

    let filtered = meals.filter(item => 
        item.strDescription && item.strDescription.trim() !== ""
    );

    filtered = filtered.slice(0, 20);

    tampilkanTable(filtered);
    isiDropdown(filtered);

});

function tampilkanTable(data) {
    let html = "";

    data.forEach((item, index) => {

        let name = item.strIngredient.replace(/ /g, "%20");
        let img = `https://www.themealdb.com/images/ingredients/${name}.png`;

        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.strIngredient}</td>
            <td>${item.strDescription}</td>
            <td><img src="${img}" width="80"></td>
        </tr>
        `;
    });

    document.getElementById("data").innerHTML = html;
}


function isiDropdown(data) {
    let select = document.getElementById("filter");

    data.forEach(item => {
        let option = document.createElement("option");
        option.value = item.strIngredient;
        option.textContent = item.strIngredient;
        select.appendChild(option);
    });

    select.addEventListener("change", function () {

        if (this.value === "all") {
            tampilkanTable(data);
        } else {
            let hasil = data.filter(item => 
                item.strIngredient === this.value
            );
            tampilkanTable(hasil);
        }

    });
}