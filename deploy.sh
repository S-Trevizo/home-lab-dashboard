#!/bin/bash
set -e

cd /home/xeon/repos/home-lab-dashboard
git pull
npm run build
sudo systemctl restart nginx