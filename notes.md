# TO SETUP PORTAL 1st time
|merge %portal our %base
|mount %portal
|install our %portal

# setup continued. do these after pulling from remote or nuking
- erase the portal folder and replace it with the one from github
|commit %portal # move files from earth (unix) to mars (urbit filesystem)

# TO NUKE
|nuke %portal, =desk &
|rein %portal [& %portal-manager]

SCRY examples from dojo
|commit %portal
=data -build-file /=portal=/sur/portal/data/hoon
=lib -build-file /=portal=/lib/portal/hoon

.^(store-result:data %gx /=portal-store=/keys/noun)
.^(store-result:data %gx /=portal-store=/item-exists/collection/(scot %p our)//~2000.1.1/noun)
.^(store-result:data %gx /=portal-store=/item/collection/(scot %p our)//~2000.1.1/noun)
.^(store-result:data %gx /=portal-store=/item-valid/collection/(scot %p our)//~2000.1.1/noun)

