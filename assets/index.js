(async () => {
    const groupSelect = document.querySelector(".group-select");
    const weekDaySelect = document.querySelector(".weekday-select");

    const fetchingTableFunction = async () => {
        if (!groupSelect.value || !weekDaySelect.value) return 0;
        let answer = await fetch("/getTimetable", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ groupId: groupSelect.value, weekDay: weekDaySelect.value })
        }).then(res => res.json());
        console.log(answer);
    };

    let groupsList = await fetch("/getGroupsList").then(res => res.json());
    groupsList.groups.forEach((e) => {
        let option = document.createElement("option");
        option.value = e;
        option.innerText = e;
        groupSelect.appendChild(option);
    });

    groupSelect.addEventListener("change", fetchingTableFunction);
    weekDaySelect.addEventListener("change", fetchingTableFunction);

})();