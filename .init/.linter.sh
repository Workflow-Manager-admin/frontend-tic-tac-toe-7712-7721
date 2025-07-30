#!/bin/bash
cd /home/kavia/workspace/code-generation/frontend-tic-tac-toe-7712-7721/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

