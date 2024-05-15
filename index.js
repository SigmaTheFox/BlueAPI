const { text } = require("./shiroko.json").parse;

function getStudent() {
	const {
		groups: { studentName },
	} = /class=\"character-name character-header\"\s?title=\".*\">(?<studentName>\w*\s?_?\(?\w*\)?)/gim.exec(
		text
	);

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
	} = /(?:<tr><th>Damage Type<\/th>\s*<td.*?>)(?<studentDamageType>[^<]*)(?:<\/td>)/gis.exec(text);

	const {
		groups: { studentArmorType },
	} = /(?:<tr><th>Damage Type<\/th>\s*<td.*?>)(?<studentArmorType>[^<]*)(?:<\/td>)/gis.exec(text);

	const {
		groups: { studentCombatClass },
	} = /(?:<tr><th>Combat Class<\/th>\s*<td.*?>)(?<studentCombatClass>[^<]*)(?:<\/td>)/gis.exec(text);

	const studentAffinities = {
		urban: undefined,
		field: undefined,
		indoors: undefined,
	};
	([
		studentAffinities.urban,
		studentAffinities.field,
		studentAffinities.indoors
	] = text.matchAll(/(\w+)(?: grade affinity)/gis).map(a => a[1]));

	

	

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
	};
}

console.log(getStudent());
