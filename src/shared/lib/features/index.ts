import { getFeatureFlags, setFeatureFlags } from './lib/setGetFeatures';
import { toggleFeatures } from './lib/toggleFeatures';
import { ToggleFeatures } from './components/ToggleFeatures/ToggleFeatures';
import { updateFeatureFlag } from './services/updateFeatureFlags';

export {
	setFeatureFlags,
	getFeatureFlags,
	toggleFeatures,
	ToggleFeatures,
	updateFeatureFlag,
};
