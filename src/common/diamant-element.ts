import {HomeAssistant} from "../ha/types";
import {LitElement, PropertyValues} from "lit";
import {property} from "lit/decorators.js";

export function computeDarkMode(hass?: HomeAssistant): boolean {
    if (!hass) return false;
    return (hass.themes as any).darkMode as boolean;
}

export class DiamantElement extends LitElement {
    @property({attribute: false}) public hass!: HomeAssistant;

    protected updated(changedProps: PropertyValues): void {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.hass) {
            const currentDarkMode = computeDarkMode(changedProps.get("hass"));
            const newDarkMode = computeDarkMode(this.hass);
            if (currentDarkMode !== newDarkMode) {
                this.toggleAttribute("dark-mode", newDarkMode);
            }
        }
    }
}