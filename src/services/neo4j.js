const neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://hobby-jajjjbihmjbogbkegpfjpcdl.dbs.graphenedb.com:24787', neo4j.auth.basic('luc', 'b.uX55KfOsWnMP.txCTNjsUskzPQySL'));

module.exports = {driver};