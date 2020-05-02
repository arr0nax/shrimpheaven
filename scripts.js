var topSPMtext;
var bigSPMtext;
var background;
var level1;
var level2;
var level3;
var score = 0;
var record = 0;
var resetButton;
var achievementsContainer;
const babyShrimp = 'babyShrimp'
const mommaShrimp = 'mommaShrimp'
const daddyShrimp = 'daddyShrimp'
const kindaFast = 'kindaFast'
const reallyFast = 'reallyFast'
const extremelyFast = 'extremelyFast'
const probablyCheating = 'probablyCheating'
const ohShitUCanType = 'ohShitUCanType'
const overpopulation = 'overpopulation'
const heavenlyShrimp = 'heavenlyShrimp'
const testingTheLimits = 'testingTheLimits'

document.addEventListener("DOMContentLoaded", function(){
    // window.localStorage.setItem('achievements', JSON.stringify({}))
    console.log("Oh you think you'll just open the console and add some shrimp huh? Not very heavenly of you, if I do say so myself.... Whatever, hope you can sleep tonight. Coward.");
    topSPMtext = document.getElementById("topSPM");
    bigSPMtext = document.getElementById("bigSPMtext");
    background = document.getElementById("background");
    level1 = document.getElementById("level1");
    level2 = document.getElementById("level2");
    level3 = document.getElementById("level3");
    resetButton = document.getElementById("resetButton");

    achievementsContainer =  document.getElementById('achievements-container');
    record = parseInt(window.localStorage.getItem('topSPM'), 10) || 0;
    topSPMtext.innerHTML = record;

    document.addEventListener("click", () => {
        addShrimp();
    })

    document.addEventListener("keydown", () => {
        addShrimp();
    })

    resetButton.addEventListener("click", () => {
        const really = confirm(`
            🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐
            Are you sure you want to reset? You will lose your top score and achievements.
            🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐
        `)
        if (really) {
            window.localStorage.setItem('achievements', JSON.stringify({}))
            window.localStorage.setItem('topSPM', 0)
            topSPMtext.innerHTML = 0;
            record = 0;
        }
    })

    setInterval(() => {
        bigSPMtext.innerHTML = score;
        background.style.opacity = score / 300;
        level1.style.opacity = (score - 50) / 50;
        level2.style.opacity = (score - 100) / 100;
        level3.style.opacity = (score - 200) / 100;


        if (score > record) {
            window.localStorage.setItem('topSPM', score);
            topSPMtext.innerHTML = score;
            record = score;
        }

        var achievements = JSON.parse(window.localStorage.getItem('achievements'));
        if (!achievements) achievements = {};
        if (score >= 1 && !achievements.babyShrimp){ achievements.babyShrimp = true; addAchievement(babyShrimp);}
        if (score >= 2 && !achievements.mamaShrimp){ achievements.mamaShrimp = true; addAchievement(mommaShrimp);}
        if (score >= 3 && !achievements.daddyShrimp){ achievements.daddyShrimp = true;addAchievement(daddyShrimp);}
        if (score >= 30 && !achievements.kindaFast){ achievements.kindaFast = true;addAchievement(kindaFast);}
        if (score >= 40 && !achievements.reallyFast){ achievements.reallyFast = true;addAchievement(reallyFast);}
        if (score >= 50 && !achievements.extremelyFast){ achievements.extremelyFast = true;addAchievement(extremelyFast);}
        if (score >= 60 && !achievements.probablyCheating){ achievements.probablyCheating = true;addAchievement(probablyCheating);}
        if (score >= 100 && !achievements.overpopulation){ achievements.overpopulation = true;addAchievement(overpopulation);}
        if (score >= 150 && !achievements.heavenlyShrimp){ achievements.heavenlyShrimp = true;addAchievement(heavenlyShrimp);}
        if (score >= 200 && !achievements.testingTheLimits){ achievements.testingTheLimits = true;addAchievement(testingTheLimits);}
        window.localStorage.setItem('achievements', JSON.stringify(achievements))
    }, 500)
});




function addShrimp() {
    const div = document.createElement('div');
    const text = document.createTextNode('🦐');
    const dice = Math.floor(Math.random() * 4);
    score += 1;
    switch (dice) {
        case 0:
            div.className = 'up shrimp'
            div.style.left = Math.round(Math.random() * 100) + 'vw'
            break;
        case 1:
            div.className = 'down shrimp'
            div.style.left = Math.round(Math.random() * 100) + 'vw'
            break;
        case 2:
            div.className = 'left shrimp'
            div.style.top = Math.round(Math.random() * 100) + 'vh'
            break;
        default:
            div.className = 'right shrimp'
            div.style.top = Math.round(Math.random() * 100) + 'vh'
            break;
    }
    div.append(text);
    document.getElementById('body').append(div);
    setTimeout(()=> {div.remove(); score -= 1;}, 5000)
    window.localStorage.setItem('totalShrimp', (window.localStorage.getItem('totalShrimp') || 0) + 1);
}

function addAchievement(achievement) {
    const div = document.createElement('div');
    div.className = 'achievement';
    const img = document.createElement('img');
    img.src = 'achievements/shrimp.png';
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container'
    const topText = document.createElement('div');
    topText.innerHTML = "Achievement Unlocked!"
    const bottomText = document.createElement('div');
    div.append(img);
    div.append(textContainer)
    textContainer.append(topText);
    textContainer.append(bottomText);

    switch(achievement) {
        case babyShrimp:
            bottomText.innerHTML = 'Baby Shwimp';
            break;
        case mommaShrimp:
            bottomText.innerHTML = 'Momma Shrimp';
            break;
        case daddyShrimp:
            bottomText.innerHTML = 'Daddy Shrimp';
            img.src = 'achievements/moustache.png';
            break;
        case kindaFast:
            bottomText.innerHTML = 'Not That Fast';
            img.src = 'achievements/frozen.png';
            break;
        case reallyFast:
            bottomText.innerHTML = 'Pretty Fast';
            img.src = 'achievements/car.png';
            break;
        case extremelyFast:
            bottomText.innerHTML = 'Extremely Fast';
            img.src = 'achievements/sonic.png';
            break;
        case probablyCheating:
            bottomText.innerHTML = 'R U Cheating?';
            img.src = 'achievements/evil.png';
            break;
        case overpopulation:
            bottomText.innerHTML = 'Population Problem';
            img.src = 'achievements/nerd.png';
            break;
        case heavenlyShrimp:
            bottomText.innerHTML = 'Closer To God';
            img.src = 'achievements/blessed.png';
            break;
        case testingTheLimits:
            bottomText.innerHTML = 'Testing the Limits';
            img.src = 'achievements/eye.png';
            break;
    }

    achievementsContainer.append(div);
}
