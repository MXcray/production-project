import { FeatureFlags } from '../../types/featureFlags';

// фичи не меняются в ходе сессии
let featureFlags: FeatureFlags = {};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
	if (newFeatureFlags) {
		featureFlags = newFeatureFlags;
	}
}

export function getFeatureFlags(flag: keyof FeatureFlags) {
	return featureFlags[flag];
}
