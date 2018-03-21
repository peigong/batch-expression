export default {
    'presets': [
        [
            '@babel/preset-env', {
                'targets': {
                    'browsers': ['chrome >= 64']
                },
                'modules': false
            }
        ]
    ]
};
