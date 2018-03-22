import babel from 'rollup-plugin-babel'
import baelConf from './babel.js';

const basePlugins = [
    babel(baelConf),
];

const ENV = {
    'local': {
        prePlugins: [
        ],
        postPlagins: [
        ]
    },
    'development': {
        prePlugins: [
        ],
        postPlagins: [
        ]
    },
    'production': {
        prePlugins: [
        ],
        postPlagins: [
        ]
    }
};

function getPlugins(key){
    key = key || 'development';
    let env = ENV[key];
    return [].concat(env.prePlugins, basePlugins, env.postPlagins);
}
export default getPlugins;
