const ALLOWED_HOSTS = [
	"inv.nadeko.net",
	"ardmediathek.de",
	"zdf.de",
];

/// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/Tab
type Tab = {
	id: number,
	mutedInfo?: { muted: boolean } & ({} | { reason: "capture" | "user" } | { reason: "extension", extensionId: string }),
	url: string,
};
/// u.a. https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onCreated
interface EventRegistry<Handler> {
	addListener(handler: Handler): void;
	removeListener(handler: Handler): void;
	hasListener(handler: Handler): boolean;
}
interface FilterableEventRegistry<Handler, Filter> {
	addListener(handler: Handler, filter?: Partial<Filter>): void;
	removeListener(handler: Handler): void;
	hasListener(handler: Handler): boolean;
}
/// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API
declare var browser: {
	pageAction: {
		show(tabId: number): void;
		hide(tabId: number): void;
		onClicked: EventRegistry<(tab: Tab, click: { modifiers: ("Shift" | "Alt" | "Command" | "Ctrl" | "MacCtrl")[], button: 0 | 1 }) => void>,
	},
	runtime: {
		id: string,
	},
	/// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs
	tabs: {
		update(id: number, update: { muted?: boolean }): Promise<Tab>;

		onCreated: EventRegistry<(tab: Tab) => void>,
		onUpdated: FilterableEventRegistry<(tabId: number, changeInfo: Partial<Tab>, tab: Tab) => void, { urls: string[], properties: string[], tabId: number, windowId: number }>,
	},
};

browser.tabs.onCreated.addListener(tab => {
	browser.tabs.update(tab.id, { muted: true });
});

function auto_mute(tab: Tab, override: boolean = false): void {
	const host = new URL(tab.url).hostname;
	const muted = !ALLOWED_HOSTS.some(allowed => `.${host}`.endsWith(allowed));
	browser.tabs.update(tab.id, { muted });
	browser.pageAction.hide(tab.id);
}

browser.tabs.onUpdated.addListener((_tab_id, change_info, tab) => {
	console.log(change_info, tab);

	// No info, nothing we can do.
	if (typeof tab.mutedInfo !== "object") {
		return;
	}

	// User override.
	const us = "reason" in tab.mutedInfo && tab.mutedInfo.reason === "extension" && tab.mutedInfo.extensionId === browser.runtime.id;
	if (!us) {
		browser.pageAction.show(tab.id);
		return;
	}

	auto_mute(tab);
}, { properties: ["url", "mutedInfo"] });

browser.pageAction.onClicked.addListener((tab, _click) => {
	auto_mute(tab);
});
