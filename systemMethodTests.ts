/**
 * 
 */

import {MethodTester} from 'atlas-dev-api'
import {AtlasConnection, Socket, AtlasConfiguration, AtlasRuntime, sym} from 'atlas-client-web'
import { timeout } from 'rxjs/operators';

const fs = require('fs');
const WebSocket = require('isomorphic-ws');
const socket = new Socket('ws://localhost:54401/data/external-api', undefined, url => new WebSocket(url));
const connection = new AtlasConnection(socket);
const config = new AtlasConfiguration(connection, 'ui', []);
const runtime = new AtlasRuntime(connection);
const SysQ = "SystemQueue"; 

function grabTimeStamp(dateObject : Date){ 
  let year : number = dateObject.getFullYear();
  // getMonth starts at zero, so need to add one
  let month : number = dateObject.getMonth() + 1;
  let day : number = dateObject.getDate();
  let hour : number = dateObject.getHours();
  let minute : number = dateObject.getMinutes();
  let seconds : number = dateObject.getSeconds();
  let date = `${year}-${month}-${day}_${hour}.${minute}.${seconds}`;
  return date; 
} 

const suiteName = "SM-Maintenance";
const resultsFile = suiteName + grabTimeStamp(new Date()) + ".xml";

let xmlString = "";

function writeToXML(data : string) {
   xmlString += data;
}

function writeExpected(data : string) {
  xmlString += "<Expected>";  
  xmlString += data; 
  xmlString += "</Expected>"; 
} 

function writeActual(data : string) {
  xmlString += "<Actual>";  
  xmlString += data; 
  xmlString += "</Actual>"; 
}

writeToXML("<Suite name='" + suiteName + "'>");
writeToXML("<StartTime>" + grabTimeStamp(new Date()) + "</StartTime>");

const tester = new MethodTester(connection);

let testName : any;
let testReq : any;
let testPassed = false;

const testComplete = tester.testCompleted;

testComplete.subscribe({
  next: (result) => {
    testName = /^([a-z]+\s*)+(?=\sreq\S)/.exec(result.name);
    testReq = /(?<=).*(?=\s)/.exec(result.name);
    testPassed = result.pass;
  }
});

/**
 * Returns an expression that can check if an atlas state
 * is equal to a string result.
 */
function stateEqualValue(path: string, value: string, idx: number = -1){
  if(idx === -1){ 
    return `state(${path}, true) === stringToSymbol('${value}')`; 
  } else {
    return `state(${path}, true)[idx] === stringToSymbol('${value}')`; 
  }
}

/**
 * Returns a dictionary that can be sent to the System Queue and processed properly
 */
function eventDict(message: string, parameters: string){
  return {NGSMessageType: `${message}`, NGSParameters: `${parameters}`, _type_: 'symbol-ht'};
}

tester.describe('system-method', () => {
  tester.beforeEach(async () => {
    await connection.waitForConnected();
    await config.refresh();
	  await config.unlock('demo user');
    await tester.initialize();
	  await tester.setWarpFactor(1);
    await tester.setSingleStep(true);
  });

  /*tester.describe('Automated Testing Works LH6527-3072', () => {
    tester.it('can receive state updates', async () => {
      await tester.waitForData(equalExpress('["system", "status", "instrumentStatus"]', '"ready"'));
      await tester.waitForData(equalExpress('["system", "status", "workflowId"]', '"ready"'));
    });
    tester.it('can send event/enter workflow', async () => {
      await tester.fireEvent(SysQ, eventDict('maintenanceWorkflow', 'none')); //{'NGSMessageType': "changeWorkflow", 'NGSParameters': "maintenance", '_type_': 'symbol-ht'});
      await tester.waitForData(equalExpress('["system", "status", "workflowId"]', '"maintenance"'));
    }); 
    tester.it('can send event/exit workflow', async () => {
      await tester.fireEvent(SysQ, eventDict('exitMaintenance', 'none'));
      await tester.waitForData(equalExpress('["system", "status", "workflowId"]', '"ready"'));
    });
  }); */

  tester.describe('System Method Setup LH6527-3454', () => {
    tester.it('can reset system status', async () => {
      await tester.waitForData(stateEqualValue('["system", "status", "instrumentStatus"]', 'not-ready'));
      await tester.waitForData(stateEqualValue('["system", "status", "workflowId"]', 'none'));
    });
    tester.it('can get system ready', async () => {
      await tester.waitForData(stateEqualValue('["system", "status", "instrumentStatus"]', 'ready'));
      await tester.waitForData(stateEqualValue('["system", "status", "workflowId"]', 'ready'));
    });
    tester.it('can add message handler', async () => {
      await tester.waitForData(stateEqualValue('["system","messageHandlers"]', 'ready', 0));
    });
  });
  /*
  tester.describe('message dispatcher', () => {
      tester.describe('can handle message errors', () => {
        tester.it('can handle incorrect message type', async () => {
          await fireEvent("incorrectWorkflow", "Param"); 
          await tester.waitForError('Hack message');
        });
        //TODO: SQL Injection?
      });
    });
  tester.describe('maintenance', () => {
      tester.beforeEach(async () => {
        // writeToXML("<Test name='" + testName[0] + "'>");
        // writeToXML("<Requirement>"+ testReq[0] + "</Requirement>");
      });
      tester.afterEach(async () => {
        //if(testPassed = true){
        //  writeToXML("<Pass />");
        //} else {
        //  writeToXML("<Fail />");
       // }
        //writeToXML("</Test>");
      });
      tester.describe ('entering maintence', () => {
        tester.it('can enter maintenance workflow req=LH6527-3081', async () => {
          writeExpected("No Error on Enter");
          
          await tester.fireEvent("SystemQueue", {'NGSMessageType': "changeWorkflow", 'NGSParameters': "maintenance", '_type_': 'symbol-ht'});  
          //await tester.fireEvent(SysQ, eventDict("maintenanceWorkflow", "none"));
          await tester.waitForData('state(["system", "status", "workflowId"], true) === stringToSymbol("maintenance")');
          writeActual("No Error on Enter");
        });
      });
      tester.describe('home instrument', () => {
        tester.it('can begin homing req=LH6527-3081',  async () => {
          //writeExpected("Instrument Status Set to Running");
          //await tester.fireEvent(SysQ, eventDict("runMaintenance", "homeInstrument"));
          //await tester.waitForData(equalExpress('["system", "status", "instrumentStatus"]', '"running"'));
          //writeActual("Status was set to running");
        });
        tester.it('can finish homing req=LH6527-3081', async () => {
          //writeExpected("Instrument Status Set to Read");
          //await tester.waitForData(equalExpress('["system", "status", "instrumentStatus"]', '"ready"'));
          //writeActual("Status was set to ready");
        });
      });
      tester.describe('can handle message errors', () => {
        tester.xit('can handle incorrect parameter', async () => {
          await fireEvent("runMaintenance", "incorrectParameter"); 
          await expectStateToEqual(["system", "status", "instrumentStatus"], "error");
        });
        tester.xit('can handle incorrect message type', async () => {
          await fireEvent("incorrectMessage", "Param"); 
          await tester.waitForError('Unknown NGSMessageType incorrectMessage');
        });
      });
      tester.describe('exiting maintenance', async () => {
        tester.it('can exit maintenance workflow req=LH6527-3081', async () => {
            //writeExpected("Workflow set to ready");
            //await tester.fireEvent(SysQ, eventDict("exitMaintenance", "none"));
            //await tester.waitForData(equalExpress('["system", "status", "workflowId"]', '"ready"'));
            //await tester.waitForData(equalExpress('["system", "status", "instrumentStatus"]', '"ready"'));
            //writeActual("Workflow set to ready");
        });
      });
  });
  tester.describe('run batch', async () => {
      let parameters = {batchId: "testID", batchName: "testName",
                        applicationName: "testAppName", sampleCount: "testCount",
                        methodName: "testName", _type_:"symbol-ht"}

      function checkBatchConfig(NGSParameter: string, value: string){
        //return fireEvent(`["system", "activeBatchConfig", stringToSymbol(${NGSParameter})]`, `${value}`)
      }

      tester.xit('can set and read batch config and workflow', async () => {
        await fireEvent("runBatchWorkflow", "parameters"); 
        await checkBatchConfig("batchId", parameters.batchId);
        await checkBatchConfig("batchName", parameters.batchName);
        await checkBatchConfig("applicationName", parameters.applicationName);
        await checkBatchConfig("sampleCount", parameters.sampleCount);
        await checkBatchConfig("methodName", parameters.methodName);
        await checkBatchConfig("methodNameToReportETC", "system-method");

        await expectStateToEqual(["system", "status", "workflowId"], "runBatch");
      });

      tester.xit('can move to batch workflow', async () => {
        await expectStateToEqual(["system", "status", "instrumentStatus"], "waiting");
        await expectStateToEqual(["system", "status", "workflowId"], "runBatch");
      });

      tester.describe('can run setup process', async () => {
        tester.xit('check and aliquot carousel contents', async () => {
          //TODO: Check the group process in the run batch method
        });
        tester.xit('can determine expected deck config and check it', async () => {
          //TODO: Check expected AOI
          await expectStateToEqual(["system", "deckVerification"], "open");
          //TODO: Check camera module command
        });
        tester.xit('can allow tthe user to load sample/bulks', async() => {
          //TODO: Check the user is able to load sample/bulks
        });
      });

    tester.xit('can generate aoi updates correctly', async () => {
        //TODO: Check AOI Updates
      });

      tester.xit('can lock door for run', async () => {
        await expectStateToEqual(["system", "door", "locker"], "true");
      });
      //TODO: Check Operation Confirmation
      //TODO: Check Device Parking
      //TODO: Check Overridding Deck Verification
      //TODO: Check Override Clearing
      tester.xit('can execute a method', async () => {
        await expectStateToEqual(["system", "status", "instrumentStatus"], "sample-ready");
      });

      tester.xit('can perform teardown', async () => {
        await expectStateToEqual(["system", "status", "instrumentStatus"], "ready");
        await expectStateToEqual(["system", "status", "workflowId"], "ready");
        await tester.waitForData(`state(["system", "activeBatchConfig", "batchId"], true) != stringToSymbol(${parameters.batchId})`);
      });
      tester.xit('can open door after a run', async () => {
        await expectStateToEqual(["system", "door", "locked"], "false");
      });
      tester.xit('can exit batch workflow', async () => {
        //runBatch currently has no exit case
      });
    });
    tester.describe('system messages', async () => {
      tester.xit('can handle msg: enrollmentRequired', async () => {
        await fireEvent("enrollmentRequired", "false"); 
        //Check to see if enrollment req is handled correctly
      });
      tester.xit('can handle msg: terminateSystemMethod', async () => {
        await fireEvent("terminateSystemMessage", "false"); 
        //Check to see if terminate system method is handled correctly
      });
    });

// tester.it('can log to xml', async () => {
//   writeToXML('<EndTime>' + grabTimeStamp(new Date()) + '</EndTime>');
//   writeToXML('</Suite>');

//   fs.writeFile(resultsFile, xmlString, (err : string) => {
//     if (err) console.log(err);
//     console.log();
//   });
// });
    */
  it('can finish running tests', async () => {
    await tester.finish(); 
  });
  
});

