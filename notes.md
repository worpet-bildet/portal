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
=gr -build-file /=portal=/sur/social-graph/hoon

.^(store-result:data %gx /=portal-store=/keys/noun)
.^(store-result:data %gx /=portal-store=/item/ship/~worpet-bildet///noun)
.^(store-result:data %gx /=portal-store=/item/collection/(scot %p our)//~2000.1.1/noun)

.^(graph-result:gr %gx /=portal-graph=/app-tags/portal-store/noun)
.^(graph-result:gr %gx /=portal-graph=/nodeset/portal-store/~zod/a/noun)
.^(graph-result:gr %gx /=portal-graph=/nodes/portal-store/entity/portal-store/'/other/~zod//~2023.5.21..13.06.04..69e9'/~zod/a/noun)

