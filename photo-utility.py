#requires Pillow, iptcinfo

from iptcinfo import IPTCInfo
import sys, os

from PIL import Image
import io, json
from pprint import pprint
from datetime import datetime, date, time

size = 512, 512

output_json = {}

for infile in os.listdir('images/photo-gallery'):
    filename = infile
    outfile = 'images/photo-gallery/thumbnails/' + os.path.splitext(infile)[0] + ".thumbnail"
    infile = 'images/photo-gallery/' + infile
    print outfile
    if infile != outfile:
        try:
            #generate thumbnails
            im = Image.open(infile)
            im.thumbnail(size)
            im.save(outfile, "JPEG")

            #get IPTC info
            #need capture date, location, keywords
            iptc = IPTCInfo(infile)
            keywords = iptc.keywords
            print keywords
            location = iptc.data[92]
            print location
            capture_date = date(int(iptc.data[55][:4]),int(iptc.data[55][4:6]),int(iptc.data[55][6:]))
            capture_time = time(int(iptc.data[60][:2]),int(iptc.data[60][2:4]),int(iptc.data[60][4:]))
            capture_datetime = datetime.combine(capture_date, capture_time)
            print capture_datetime

            output_json[filename] = {
                "keywords":keywords,
                "location":location,
                "capture_datetime":capture_datetime.isoformat()
            }

        except IOError as e:
            print "cannot create thumbnail for", infile
            print e

with open('images/photo-gallery/gallery.json', 'w') as outfile:
    json.dump(output_json, outfile)