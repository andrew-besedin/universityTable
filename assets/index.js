(async () => {
    let groupsList = await fetch("/getGroupsList").then(res => res.json());
    groupsList.groups.forEach((e) => {
        let option = document.createElement("option");
        option.value = e;
        option.innerText = e;
        document.querySelector(".group-select").appendChild(option);
    });
})();