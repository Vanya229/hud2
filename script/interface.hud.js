/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
/*             CEF STUDIO            */
var CEFSTUDIO = new Vue({
    el: ".classic-hud",
    data: {
        active: !1,
        date: '02.03.24',
        time: '20:33:43',
        player: 'Mironchik_Dev',
        playerid: 0,
        weapon: 'images/gun/gun_0.png',
        ammo: 0,
        maxammo: 0,
        armour: 0,
        health: 0,
        handcuffs: 0,
        money: format(0),
        card: format(0),
        city: 'г.Арзамас',
        street: 'ул.Пушкина 52'
    },
    mounted() {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'F7') {
                if (this.active) {
                    this.active = false;
                    cef.emit("game:hud:setComponentVisible", "radar", false);
                } else {
                    this.active = true;
                    cef.emit("game:hud:setComponentVisible", "radar", true);
                }
            }
        });
    },
});
setInterval(() => {
	if(CEFSTUDIO.active) {
		let date = new Date();

		CEFSTUDIO.time = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;
		let str = date.getFullYear();
		let mou = date.getMonth() + 1;
		let day = date.getDate();
		CEFSTUDIO.date = `${day < 10 ? '0' + day : day}.${mou < 10 ? '0' + mou : mou}.${str.toString().replace('20', '')}`;
	}
}, 1000);

function setHealth(amount) {
    const circleHealth = document.getElementById('circle-health');
    const circumHealth = 2 * Math.PI * parseFloat(circleHealth.getAttribute('r'));
    const offset = circumHealth - amount / 100 * circumHealth;
    circleHealth.style.strokeDashoffset = offset;
    CEFSTUDIO.health = Math.round(amount);
}
function format(i) {
    var text_fmt = `${i}`;
    var text_tmp = text_fmt;
    var text_len = text_fmt.length;

    var dots_count = 0;

    for (var idx = 0; idx < (text_len - 1); idx++) {
        if (text_tmp[idx] == ' ') {
            continue;
        }

        if (((text_len - (idx + 1)) % 3) == 0) {
            dots_count++;

            text_tmp = text_tmp.slice(0, idx + dots_count) + ' ' + text_tmp.slice(idx + dots_count);
        }
    }
    return text_tmp;
}

cef.emit("game:hud:setComponentVisible", "interface", false);
cef.emit("game:data:pollPlayerStats", true, 50);
cef.on("game:data:playerStats", (hp, max_hp, arm, breath, wanted, weapon, ammo, max_ammo, money) => {
    if (CEFSTUDIO.active) {
		CEFSTUDIO.armour = Math.round(arm);
		setHealth(hp);

		CEFSTUDIO.handcuffs = wanted;

		CEFSTUDIO.weapon = `images/gun/gun_${weapon}.png`;
		CEFSTUDIO.ammo = ammo;
		CEFSTUDIO.maxammo = max_ammo;
    }
});

cef.on("classic:hud:active", (status) => CEFSTUDIO.active = status);
cef.on("classic:hud:location", (eCity, eStreet) => {
    if (CEFSTUDIO.active) {
		CEFSTUDIO.city = `${eCity}`;
		CEFSTUDIO.street = `${eStreet}`;
    }
});
cef.on("classic:hud:update", (eMoney, eCard, ePlayer, ePlayerId) => {
    if (CEFSTUDIO.active) {
		CEFSTUDIO.money = format(eMoney);
		CEFSTUDIO.card = format(eCard);

		CEFSTUDIO.player = `${ePlayer}`;
		CEFSTUDIO.playerid = ePlayerId;
    }
});
