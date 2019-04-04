# Demo: SmartCon
SmartCon demostrate the ability to apply DevOps practices like to Canary Releasing and A/B Testing to Machine Learning models.

## Components

### Collector
Collector is a scraper for KubeCon Europe 2019. It will get the schedule from [Sched](https://kccnceu19.sched.com/) and scrape out the information from the sessions.

```sh
virtualenv --python=python3 .env && source ./.env/bin/activate
pip3 install -r ./collector/requirements.txt
python ./collector/collect.py
```

