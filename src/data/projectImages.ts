import sigmaHedgePricer from '../assets/projects/sigma_hedge_pricer.png';
import holdoutMarkets from '../assets/projects/holdout_markets.jpg';
import auraHftDemo from '../assets/projects/aura_hft_demo.jpg';
import quantiloTimeseries from '../assets/projects/quantilo_timeseries.jpg';
import squareyieldMarket from '../assets/projects/squareyield_market.jpg';
import smartCameraRig from '../assets/projects/smart_camera_rig.jpg';

export const projectImagesMap: Record<string, string> = {
  '01-sigma-hedge': sigmaHedgePricer,
  '02-financial-data-analysis-app': holdoutMarkets,
  '03-aura-hft': auraHftDemo,
  '04-data-explorer': quantiloTimeseries,
  '05-real-estate-analytics-fr': squareyieldMarket,
  '06-15-raspberry-pi-project': smartCameraRig,
};

export const defaultProjectImage = sigmaHedgePricer;
