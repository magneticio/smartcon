import json
import codecs
import requests
from pprint import pprint
from bs4 import BeautifulSoup

baseUrl = "https://kccnceu19.sched.com/"

def find_events():
    f = codecs.open("collector/data/schedule.html", 'r', 'utf-8')
    soup = BeautifulSoup(f.read(), features="html.parser")

    results = []

    for part in soup.select('span[class*="event"]'):
        event = { 'title': part.get_text() }
        for a in part.find_all('a', href=True):
            url = a['href']
            segments = url.split('/')
            id = segments[2]
            title = segments[3]
            event.update({
                'id': id,
                'url': baseUrl + url
            })
        
        results.append(event)
    
    return results

def download_schedule():
    r = requests.get(baseUrl)
    f = open("./collector/data/schedule.html", "w")
    f.write(r.text)
    f.close()
    r.close()

def download_events(event):
    r = requests.get(baseUrl + event['url'])
    f = open("./collector/data/events/" + event['id'] + ".html", "w")
    f.write(r.text)
    f.close()
    r.close()

def populate_event(event):
    f = codecs.open("collector/events/" + event['id'] + ".html", 'r', 'utf-8')
    soup = BeautifulSoup(f.read(), features="html.parser")

    speakers = []
    timeandplace = soup.find('div', class_="sched-event-details-timeandplace").get_text().strip('\n').split('\n')
    info = {
        'title': soup.find('a', class_="name").get_text().strip(),
        'description': find_insoup(soup, 'div', "tip-description"),
        'time': timeandplace[0],
        'place':timeandplace[1] if len(timeandplace) > 1 else None,
        'category': find_insoup(soup, 'div', "sched-event-type"),
        'skill_level': find_insoup(soup, 'ul', "tip-custom-fields"),
        'speakers': speakers
    }
    for part in soup.find_all('div', class_="sched-person"):
        speakers.append({
            'name': part.find('a', title=True).get_text().strip(),
            'role': find_insoup(part, 'div', "sched-event-details-role-company"),
            'bio': find_insoup(part, 'div', "sched-event-details-role-bio")
        })
    event.update(info)

def find_insoup(soup, tag, class_):
    return soup.find(tag, class_=class_).get_text().strip().rstrip('Read More \u2192') if soup.find(tag, class_=class_) != None else None

#print("Downloading schedule...")
#download_schedule(event)
#print(f"Downloaded schedule...")

print("Searching for events...")
events = find_events()
print(f"Found '{len(events)}' events")

#print("Downloading events...")
#for event in events:
#    print(f"Downloading event '{event['title']}'")
#    download_events(event)
#    print(f"Downloaded event '{event['title']}'")

print("Completing event information...")
for event in events:
    print(f"Completing event '{event['title']}'")
    populate_event(event)
    print(f"Completed event '{event['title']}'")

content = json.dumps(events)
f = open("sessions.json", "w")
f.write(content)
f.close()
