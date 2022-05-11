#! /bin/bash
scp -r ./dist/ng-eurovoter/*.js ${EUROVOTER_REMOTE}
scp -r ./dist/ng-eurovoter/*.html ${EUROVOTER_REMOTE}
scp -r ./dist/ng-eurovoter/*.css ${EUROVOTER_REMOTE}