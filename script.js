function calculateResult() {

    let totalMarks =
        Number(document.getElementById("m1").value) +
        Number(document.getElementById("m2").value) +
        Number(document.getElementById("m3").value) +
        Number(document.getElementById("m4").value) +
        Number(document.getElementById("m5").value) +
        Number(document.getElementById("m6").value) +
        Number(document.getElementById("m7").value) +
        Number(document.getElementById("m8").value);


    //let totalText = document.getElementById("total");
    //let resultText = document.getElementById("result");

    document.getElementById("total").innerHTML = "Total Marks: " + totalMarks + " / 800";

    if (totalMarks >= 700) {
        document.getElementById("result").innerHTML = "DISTINCTION";
        document.getElementById("result").style.color = "green";
    }
    else if (totalMarks >= 600) {
        document.getElementById("result").innerHTML = "PASS – First Division";
    }
    else if (totalMarks >= 500) {
        document.getElementById("result").innerHTML = "PASS – Second Division";
    }
    else if (totalMarks >= 400) {
        document.getElementById("result").innerHTML = "PASS – Third Division";
    }
    else {
        document.getElementById("result").innerHTML = "FAIL";
        document.getElementById("result").style.color = "red";
    }
}