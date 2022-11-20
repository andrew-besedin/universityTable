(async () => {
    const groupSelect = document.querySelector(".group-select");
    const weekDaySelect = document.querySelector(".weekday-select");
    const mainTable = document.querySelector(".main-table");

    const fetchingTableFunction = async () => {
        if (!groupSelect.value || !weekDaySelect.value) return 0;
        let answer = await fetch("/getTimetable", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ groupId: groupSelect.value, weekDay: weekDaySelect.value })
        }).then(res => res.json());
        mainTable.innerHTML = null;
        if (!answer.timetable.length) {
            mainTable.innerText = "В этот день пар нет";
            return 0;
        }
        let tableHead = document.createElement("tr");
        let headData = document.createElement("td");
        headData.innerHTML = "<b>№</b>";
        tableHead.appendChild(headData);
        headData = document.createElement("td");
        headData.innerHTML = "<b>Предмет</b>";
        tableHead.appendChild(headData);
        headData = document.createElement("td");
        headData.innerHTML = "<b>Время</b>";
        tableHead.appendChild(headData);
        mainTable.appendChild(tableHead);
        for (let i = 1; i <= 7; i ++) {
            const lessonInfo = answer.timetable.find(e => e.number == i); 
            if (lessonInfo) {
                let tableRow = document.createElement("tr")
                let tableData = document.createElement("td");
                tableData.innerText = i;
                tableRow.appendChild(tableData);
                tableData = document.createElement("td");
                tableData.innerText = lessonInfo.subject;
                tableRow.appendChild(tableData);
                tableData = document.createElement("td");
                let lessonTime = answer.commonTimetable.find(e => e.number == i)?.time;
                (lessonTime) ? tableData.innerText = lessonTime : tableData.innerText = "";
                tableRow.appendChild(tableData);
                mainTable.appendChild(tableRow);
            }
        }
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