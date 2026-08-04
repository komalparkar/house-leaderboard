// =============================
// Google Apps Script URL
// =============================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbz78oE6SG736cfapb5j9W_p2ikyUnAEiNmVg-uDoRhDLkj-8VJKQ3b1gg3H5td5lhdr0A/exec";

// =============================
// Live Clock
// =============================

function updateClock() {

    const now = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    const date = now.toLocaleDateString("en-IN", options);

    const time = now.toLocaleTimeString("en-IN");

    document.getElementById("clock").innerHTML =
        `${date}<br>${time}`;

}

setInterval(updateClock,1000);
updateClock();


// =============================
// Medal
// =============================

function getMedal(rank){

    rank = Number(rank);

    if(rank===1) return "🥇";
    if(rank===2) return "🥈";
    if(rank===3) return "🥉";

    return rank;

}


// =============================
// House CSS Class
// =============================

function houseClass(name){

    name=name.toLowerCase();

    if(name.includes("ruby")) return "ruby";

    if(name.includes("emerald")) return "emerald";

    if(name.includes("sapphire")) return "sapphire";

    if(name.includes("topaz")) return "topaz";

    return "";

}


// =============================
// Load Leaderboard
// =============================

async function loadLeaderboard(){

    try{

        const response = await fetch(WEB_APP_URL);

        const data = await response.json();

        // Sort by Rank

        data.sort((a,b)=>a.rank-b.rank);

        const board=document.getElementById("leaderboard");

        board.innerHTML="";

        data.forEach(team=>{

            board.innerHTML+=`

            <div class="card ${houseClass(team.house)}">

                <div class="rank">
                    ${getMedal(team.rank)}
                </div>

                <div class="house">
                    ${team.house}
                </div>

                <div class="score">
                    ${team.score}
                </div>

            </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

loadLeaderboard();

setInterval(loadLeaderboard,5000);

