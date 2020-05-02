var topSPMtext;
var totalShrimpText;
var bigSPMtext;
var background;
var level1;
var level2;
var level3;
var score = 0;
var record = 0;
var totalShrimp = 0;
var resetButton;
var cocktailButton;
var frozenButton;
var conveyorButton;
var achievementsContainer;
var machinesContainer;
var cocktails = 0;
var cocktailsCount;
var cocktailStoreRow;
var cocktailsDiv;
var cocktailPrice = () => Math.floor(Math.pow(cocktails, 1.71828182846)) + 100;
var cocktailPriceText;
var frozens = 0;
var frozensCount;
var frozenStoreRow;
var frozensDiv;
var frozenPrice = () => (Math.floor(Math.pow(frozens, 1.71828182846)) + 100) * 10;
var frozenPriceText;
var conveyors = 0;
var conveyorsCount;
var conveyorStoreRow;
var conveyorsDiv;
var conveyorPrice = () => (Math.floor(Math.pow(conveyors, 1.71828182846)) + 100) * 100;
var conveyorPriceText;
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
    totalShrimpText = document.getElementById("totalShrimpText");
    bigSPMtext = document.getElementById("bigSPMtext");
    background = document.getElementById("background");
    level1 = document.getElementById("level1");
    level2 = document.getElementById("level2");
    level3 = document.getElementById("level3");
    resetButton = document.getElementById("resetButton");
    cocktailButton = document.getElementById("cocktailButton");
    frozenButton = document.getElementById("frozenButton");
    conveyorButton = document.getElementById("conveyorButton");
    machinesContainer = document.getElementById("machinesContainer");
    cocktailsDiv = document.getElementById("cocktails");
    frozensDiv = document.getElementById("frozens");
    conveyorsDiv = document.getElementById("conveyors");
    cocktailsCount = document.getElementById("cocktailsCount")
    frozensCount = document.getElementById("frozensCount")
    conveyorsCount = document.getElementById("conveyorsCount")

    achievementsContainer =  document.getElementById('achievements-container');
    record = parseInt(window.localStorage.getItem('topSPM'), 10) || 0;
    totalShrimp = parseInt(window.localStorage.getItem('totalShrimp'), 10) || 0;
    // totalShrimp = 9900;
    cocktails = parseInt(window.localStorage.getItem('cocktails'), 10) || 0;
    frozens = parseInt(window.localStorage.getItem('frozens'), 10) || 0;
    conveyors = parseInt(window.localStorage.getItem('conveyors'), 10) || 0;
    cocktailPriceText = document.getElementById('cocktailPriceText')
    frozenPriceText = document.getElementById('frozenPriceText')
    conveyorPriceText = document.getElementById('conveyorPriceText')
    cocktailStoreRow = document.getElementById('cocktailStoreRow')
    frozenStoreRow = document.getElementById('frozenStoreRow')
    conveyorStoreRow = document.getElementById('conveyorStoreRow')

    addMachines();

    topSPMtext.innerHTML = record;

    document.addEventListener("click", () => {
        addShrimp();
    })

    document.addEventListener("keydown", () => {
        addShrimp();
    })

    cocktailButton.addEventListener("click", () => {
        if (totalShrimp > cocktailPrice()) {
            totalShrimp -= cocktailPrice();
            cocktails += 1;
            window.localStorage.setItem('cocktails', cocktails)
            addCocktail();
        }
    });

    frozenButton.addEventListener("click", () => {
        if (totalShrimp > frozenPrice()) {
            totalShrimp -= frozenPrice();
            frozens += 1;
            window.localStorage.setItem('frozens', frozens)
            addFrozen();
        }
    });

    conveyorButton.addEventListener("click", () => {
        if (totalShrimp > conveyorPrice()) {
            totalShrimp -= conveyorPrice();
            conveyors += 1;
            window.localStorage.setItem('conveyors', conveyors)
            addConveyor();
        }
    });

    resetButton.addEventListener("click", () => {
        const really = confirm(`
            🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐
            Are you sure you want to reset? You will lose your top score and achievements.
            🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐
        `)
        if (really) {
            totalShrimp = 0;
            localStorage.clear();
            location.reload();
        }
    })

    setInterval(() => {
        const addScore = countMachines();
        const currentScore = score + addScore

        bigSPMtext.innerHTML = currentScore;
        background.style.opacity = currentScore / 300;
        level1.style.opacity = (currentScore - 50) / 50;
        level2.style.opacity = (currentScore - 100) / 100;
        level3.style.opacity = (currentScore - 200) / 100;

        window.localStorage.setItem('totalShrimp', totalShrimp)
        totalShrimpText.innerHTML = totalShrimp;
        if (currentScore > record) {
            window.localStorage.setItem('topSPM', currentScore);
            topSPMtext.innerHTML = currentScore;
            record = currentScore;
        }

        if (totalShrimp > 50) {
            cocktailStoreRow.style.display = 'flex';
        }

        if (totalShrimp > 500) {
            frozenStoreRow.style.display = 'flex';
        }

        if (totalShrimp > 5000) {
            conveyorStoreRow.style.display = 'flex';
        }

        if (totalShrimp > cocktailPrice()) {
            cocktailButton.disabled = false;
        } else {
            cocktailButton.disabled = true;
        }
        if (totalShrimp > frozenPrice()) {
            frozenButton.disabled = false;
        } else {
            frozenButton.disabled = true;
        }
        if (totalShrimp > conveyorPrice()) {
            conveyorButton.disabled = false;
        } else {
            conveyorButton.disabled = true;
        }

        var achievements = JSON.parse(window.localStorage.getItem('achievements'));
        if (!achievements) achievements = {};
        if (currentScore >= 2 && !achievements.babyShrimp){ achievements.babyShrimp = true; addAchievement(babyShrimp);}
        if (currentScore >= 3 && !achievements.mamaShrimp){ achievements.mamaShrimp = true; addAchievement(mommaShrimp);}
        if (currentScore >= 4 && !achievements.daddyShrimp){ achievements.daddyShrimp = true;addAchievement(daddyShrimp);}
        if (currentScore >= 30 && !achievements.kindaFast){ achievements.kindaFast = true;addAchievement(kindaFast);}
        if (currentScore >= 40 && !achievements.reallyFast){ achievements.reallyFast = true;addAchievement(reallyFast);}
        if (currentScore >= 50 && !achievements.extremelyFast){ achievements.extremelyFast = true;addAchievement(extremelyFast);}
        if (currentScore >= 60 && !achievements.probablyCheating){ achievements.probablyCheating = true;addAchievement(probablyCheating);}
        if (currentScore >= 100 && !achievements.overpopulation){ achievements.overpopulation = true;addAchievement(overpopulation);}
        if (currentScore >= 150 && !achievements.heavenlyShrimp){ achievements.heavenlyShrimp = true;addAchievement(heavenlyShrimp);}
        if (currentScore >= 200 && !achievements.testingTheLimits){ achievements.testingTheLimits = true;addAchievement(testingTheLimits);}
        window.localStorage.setItem('achievements', JSON.stringify(achievements))
    }, 500)
});




function addShrimp() {
    const div = document.createElement('div');
    const text = document.createTextNode('🦐');
    const dice = Math.floor(Math.random() * 4);
    const bigShrimp = Math.random() > 0.9999;
    if (bigShrimp) {
        div.style.fontSize = '200px';
    }
    score += 1;
    totalShrimp += 1;
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


}

function addCocktail() {
    cocktailsCount.innerHTML = cocktails;
        const div = document.createElement('div');
        div.className="machine";
        const img = document.createElement('img');
        img.style.width = '100px';
        img.style.height = '100px';
        img.src = 'machines/cocktail.png';
        div.appendChild(img);
        cocktailsDiv.appendChild(div);
        cocktailPriceText.innerHTML = cocktailPrice();
        if (totalShrimp < cocktailPrice()) {
            cocktailButton.disabled = true;
        }
}

function addFrozen() {
    frozensCount.innerHTML = frozens;
        const div = document.createElement('div');
        div.className="machine";
        const img = document.createElement('img');
        img.style.width = '100px';
        img.style.height = '100px';
        img.src = 'machines/frozen.png';
        div.appendChild(img);
        frozensDiv.appendChild(div);
        frozenPriceText.innerHTML = frozenPrice();
        if (totalShrimp < frozenPrice()) {
            frozenButton.disabled = true;
        }
}

function addConveyor() {

    conveyorsCount.innerHTML = conveyors;
        const div = document.createElement('div');
        div.className="machine";
        const img = document.createElement('img');
        img.style.width = '100px';
        img.style.height = '100px';
        img.src = 'machines/conveyor.png';
        div.appendChild(img);
        conveyorsDiv.appendChild(div);
        conveyorPriceText.innerHTML = conveyorPrice();
        if (totalShrimp < conveyorPrice()) {
            conveyorButton.disabled = true;
        }
}

function countMachines() {
    const fromCocktails = cocktails * 1;
    const fromFrozens = frozens * 5;
    const fromConveyors = conveyors * 20;

    const fromMachines = fromCocktails + fromFrozens + fromConveyors;

    totalShrimp += fromMachines;
    return fromMachines;
}

function addMachines() {
    cocktailPriceText.innerHTML = cocktailPrice();
    for (var i=0; i<cocktails; i++) {
        addCocktail();
    }

    frozenPriceText.innerHTML = frozenPrice();
    for (var i=0; i<frozens; i++) {
        addFrozen();
    }

    conveyorPriceText.innerHTML = conveyorPrice();
    for (var i=0; i<conveyors; i++) {
        addConveyor();
    }
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
