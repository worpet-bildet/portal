/-  *social-graph
|%
::
::  TODO: flesh out an example case for a globally-attested edge and build
::  ability to handle that into edge/app/tag definitions
::
++  gi  bi:mip              ::  graph engine = mip engine
::
++  sg
  |_  social-graph
  ::
  ::  receive a set of nodes stemming from source node with this tag
  ::  if tag is left unspecified, any node with matching app is given
  ::
  ++  get-nodes
    |=  [from=node =app tag=(unit tag)]
    ^-  (set node)
    ?^  tag
      (~(get ju (~(gut gi edges) app u.tag *nodeset)) from)
    %-  ~(rep by (~(gut by edges) app ~))
    |=  [n=[^tag nodeset] res=(set node)]
    (~(uni in res) (~(get ju +.n) from))
  ::
  ::  receive all node-node relations under app+tag
  ::
  ++  get-nodeset
    |=  [=app =tag]
    ^-  nodeset
    (~(gut by (~(gut by edges) app ~)) tag ~)
  ::
  ::  receive edge associated with a specific node->node
  ::
  ++  get-edge
    |=  [from=node to=node]
    ^-  (unit edge)
    (~(get gi nodes) from to)
  ::
  ::  receive set of tags used by given app
  ::
  ++  get-app-tags
    |=  =app
    ^-  (set tag)
    ~(key by (~(gut by edges) app ~))
  ::
  ::  receive full app's worth of graph
  ::
  ++  get-app
    |=  =app
    ^-  (map tag nodeset)
    (~(gut by edges) app ~)
  ::
  ::  see if a given relationship exists
  ::
  ++  has-tag
    |=  [from=node to=node =app =tag]
    ^-  ?
    (~(has ju (~(gut gi nodes) from to ~)) app tag)
  ::
  ::  see whether a specific tag is bidirectional or not
  ::
  ++  is-bidirectional
    |=  [n1=node n2=node =app =tag]
    ^-  ?
    =+  edg=(~(gut gi edges) app tag *nodeset)
    ?&  (~(has ju edg) n1 n2)
        (~(has ju edg) n2 n1)
    ==
  ::
  ::  remove all edges attached to a particular node
  ::
  ++  nuke-node
    |=  =node
    ^-  social-graph
    :-  ::  nodes
        %-  ~(run by (~(del by nodes) node))
        |=  m=(map ^node edge)
        (~(del by m) node)
    ::  edges
    %-  ~(run by edges)
    |=  m=(map tag nodeset)
    %-  ~(run by m)
    |=  =nodeset
    %-  ~(run by (~(del by nodeset) node))
    |=  n=(set ^node)
    (~(del in n) node)
  ::
  ::  remove a tag on all edges within a particular app
  ::
  ++  nuke-tag
    |=  [=app =tag]
    ^-  social-graph
    :-  ::  nodes
        ::  use nodeset at tag to iteratively clean edges
        =/  nl=(list [node node])
          (tap-nodeset (~(gut by (~(gut by edges) app ~)) tag ~))
        |-
        ?~  nl  nodes
        =.  nodes
          ?~  e=(~(del ju (~(gut gi nodes) -.i.nl +.i.nl *edge)) app tag)
            (~(del gi nodes) -.i.nl +.i.nl)
          (~(put gi nodes) -.i.nl +.i.nl e)
        $(nl t.nl)
    ::  edges
    ?~  e=(~(del by (~(gut by edges) app ~)) tag)
      (~(del by edges) app)
    (~(put by edges) app e)

  ::
  ::  given a top-level path item, remove all tags that start with it in app
  ::
  ++  nuke-top-level-tag
    |=  [=app top=@]
    ^-  social-graph
    :-  ::  nodes
        =/  tags=(list tag)
          %+  skim  ~(tap in (get-app-tags app))
          |=(=tag ?&(?=(^ tag) =(i.tag top)))
        |-
        ?~  tags  nodes
        ::  use nodeset at tag to iteratively clean edges
        =/  nl=(list [node node])
          (tap-nodeset (~(gut by (~(gut by edges) app ~)) i.tags ~))
        =.  nodes
          |-  ?~  nl  nodes
          =.  nodes
            ?~  e=(~(del ju (~(gut gi nodes) -.i.nl +.i.nl *edge)) app i.tags)
              (~(del gi nodes) -.i.nl +.i.nl)
            (~(put gi nodes) -.i.nl +.i.nl e)
          $(nl t.nl)
        $(tags t.tags)
    ::  edges
    =-  ?~(- (~(del by edges) app) (~(put by edges) app -))
    %-  ~(gas by *(map tag nodeset))
    %+  skip
      ~(tap by (~(gut by edges) app ~))
    |=([=tag nodeset] ?&(?=(^ tag) =(i.tag top)))
  ::
  ++  add-tag
    |=  [from=node to=node =app =tag]
    ^-  social-graph
    :-  ::  nodes
        =-  (~(put gi nodes) from to -)
        (~(put ju (~(gut gi nodes) from to ~)) app tag)
    ::  edges
    =-  (~(put gi edges) app tag -)
    (~(put ju (~(gut gi edges) app tag *nodeset)) from to)
  ::
  ++  del-tag
    |=  [from=node to=node =app =tag]
    ^-  social-graph
    :-  ::  nodes
        ::  if this deletion results in an empty edge,
        ::  remove 'to' node from nodes
        ?~  e=(~(del ju (~(gut gi nodes) from to *edge)) app tag)
          (~(del gi nodes) from to)
        (~(put gi nodes) from to e)
    ::  edges
    ?~  e=(~(del ju (~(gut gi edges) app tag *nodeset)) from to)
      (~(del gi edges) app tag)
    (~(put gi edges) app tag e)
  ::
  ::  replace our own nodeset for a given app+tag
  ::
  ++  replace-nodeset
    |=  [=nodeset =app =tag]
    ^-  social-graph
    ::  first, nuke tag for clean slate
    =.  nodes
      =/  nl=(list [node node])
        (tap-nodeset (~(gut by (~(gut by edges) app ~)) tag ~))
      |-
      ?~  nl  nodes
      =.  nodes
        ?~  e=(~(del ju (~(gut gi nodes) -.i.nl +.i.nl *edge)) app tag)
          (~(del gi nodes) -.i.nl +.i.nl)
        (~(put gi nodes) -.i.nl +.i.nl e)
      $(nl t.nl)
    =/  nl=(list [node node])
      (tap-nodeset nodeset)
    :-  ::  nodes
        |-
        ?~  nl  nodes
        =+  (~(put ju (~(gut gi nodes) -.i.nl +.i.nl ~)) app tag)
        $(nl t.nl, nodes (~(put gi nodes) -.i.nl +.i.nl -))
    ::  edges
    (~(put gi edges) app tag nodeset)
  --
::
::  pleasant helper functions
::
++  in-nodeset
  |=  [no=node ns=nodeset]
  ^-  ?
  =-  (~(has in -) no)
  (nodeset-to-set ns)
::
++  tap-nodeset
  |=  =nodeset
  ^-  (list [node node])
  %-  zing
  %+  turn  ~(tap by nodeset)
  |=  [n1=node s=(set node)]
  (turn ~(tap in s) |=(n2=node [n1 n2]))
::
++  nodeset-to-set
  |=  =nodeset
  ^-  (set node)
  %-  ~(uni in ~(key by nodeset))
  ^-  (set node)
  %-  ~(rep by nodeset)
  |=  [p=[node (set node)] q=(set node)]
  (~(uni in q) +.p)
--