# Demo: SmartCon
SmartCon demostrate the ability to apply DevOps practices like to Canary Releasing and A/B Testing to Machine Learning models.

## Demo
* **Get ready**  
    Create and setup the required infrastructure
* **Release - SmartCon 1.0**
    Release the first version of the application without recommendations.
* **Canary release - SmartCon 1.1**  
    Release the application which includes additional service which contains the ML model for recommendations.
* **Canary release - SmartCon Recommendations 1.1**  
    Release a new version of the recommendation model which has a smarter model for recommendations.
* **A/B Test - SmartCon Recommendations 1.1 & 1.2**  
    Try out a new recommendation model in production.

## Tools

### Collector
Collector is a scraper for KubeCon Europe 2019. It will get the schedule from [Sched](https://kccnceu19.sched.com/) and scrape out the information from the sessions.

```sh
virtualenv --python=python3 .env && source ./.env/bin/activate
pip3 install -r ./collector/requirements.txt
python ./collector/collect.py
```

