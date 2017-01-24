import * as types from './const/actionsType';
export function changeLayoutSection(section) {
    return {type: types.CHANGE_LAYOUT_SECTION, section: section};
}