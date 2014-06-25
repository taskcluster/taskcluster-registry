Docker Registry for TaskCluster
===============================
A docker registry for taskcluster that uses auth.taskcluster.net and redirects
to S3 for pull and streams to S3 using multi-part upload for push. Without ever
holding a complete copy of the uploaded file on disk like the official registry
does.

Later also things like replicate to different regions. And serve requesters
based on region they are in. Using IP ranges to figure out which region an
requester is in.

Also should have a web-interface for listing repositories that exists, and
deleting them. And a scheduled heroku task that garbage collects image layers
which isn't referenced.

Note that while docker repositories are organized as `<user>/<repository>`.
This registry does associate clientIds with users... and actually `<user>` in
the sense above is more of a string that identifies a section of repositories.

For credentials to run dev setups ask jonsafj.
