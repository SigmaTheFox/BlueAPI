const { text } = require("./shiroko.json").parse;

function getStudent() {

	const studentName = (() => {
		const { groups: { en, jp }, } =
			(/<th>Full Name<\/th><td>(?<en>[\w\p{L}\s]*)(?:<br \/>|\s*)\((?<jp>[\w\p{L}\s]*)\)<\/td>/gisu.exec(
				text
			));
		return { en, jp };
	})();

	const {
		groups: { studentRarity },
	} = /class=\"character-rarity\" data-value=\"(?<studentRarity>\d)/gim.exec(text);

	const {
		groups: { studentProfileImg },
	} = /data-title=\"Profile\s?Image[\"><a-z\s=\-:\/\.]*src=\"\/\/(?<studentProfileImg>[a-zA-Z\.\/0-9-_]*)/gim.exec(
		text
	);
	
	const {
		groups: { studentSchool, studentGroup, studentRole },
	} = /(?:<th class=\"character-school character-header\">.*?<td title=\")(?<studentSchool>[^,]*?)(?:,\s*)(?<studentGroup>[^\"]*)(?:\">)(?:.*?<td>.*?<\/p>\s*)(?<studentRole>.*?)(?:<\/td>)/gis.exec(
		text
	);
	
	const {
		groups: { studentDamageType },
	} = /(?:<tr><th>Damage Type<\/th>\s*<td.*?>)(?<studentDamageType>[^<]*)(?:<\/td>)/gis.exec(
		text
	);

	const {
		groups: { studentArmorType },
	} = /(?:<tr><th>Armor Type<\/th>\s*<td.*?>)(?<studentArmorType>[^<]*)(?:<\/td>)/gis.exec(
		text
	);

	const {
		groups: { studentCombatClass },
	} = /(?:<tr><th>Combat Class<\/th>\s*<td.*?>)(?<studentCombatClass>[^<]*)(?:<\/td>)/gis.exec(
		text
	);

	const studentAffinities = (() => {
		let [urban, field, indoors] = text.matchAll(/(\w+)(?: grade affinity)/gis).map(a => a[1]);
		return { urban: urban, field: field, indoors: indoors };
	})();

	/* TO-DO:
	 * - Change to map
	 * - Add weapon name
	 * - Add weapon image
	 */
	const {
		groups: { studentWeaponType },
	} = /(?:"weapon-text".*?figcaption>)(?<studentWeaponType>.*?)(?:<\/figcaption>)/gimus.exec(
		text
	);
	
	const studentUsesCover = /<span title="Uses cover">/gimus.test(text);

	const studentEquipment = [
		...text.matchAll(/<td class="equipment equipment-\d" data-value="(.*?)">/gimus)
			.map(equipment => equipment[1])
	];

	/* Partially implemented.
	 * Missing:
	 * - Equipment stats (heavy use of HTML markup and styling...)
	 */
	const studentUniqueGear = (() => {
		const {
			groups: { gearName, icon, descriptionEn, descriptionJp },
		} = /"geartable-summary".*?<img.*?src="(?<icon>.*?)".*?"gear-name-main".*?>(?<gearName>.*?)<\/span>.*?"gear-description".*?"English".*?p.*?>(?<descriptionEn>.*?)<\/p>.*?"Japanese".*?p.*?>(?<descriptionJp>.*?)<\/p>/gimus.exec(
			text
		);
		return {
			name: gearName,
			icon: `https:${icon}`,
			description: {
				en: descriptionEn,
				jp: descriptionJp,
			},
		};
	})();



	return {
		studentName,
		studentRarity,
		studentProfileImg: `https://${studentProfileImg}`,
		studentSchool,
		studentGroup,
		studentRole,
		studentDamageType,
		studentArmorType,
		studentCombatClass,
		studentAffinities,
		studentWeaponType,
		studentUsesCover,
		studentEquipment,
		studentUniqueGear,
	};
}

console.log(getStudent());
