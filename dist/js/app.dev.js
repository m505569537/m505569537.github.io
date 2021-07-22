/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "71594d04bcc8199a720f";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn-bd": "./node_modules/moment/locale/bn-bd.js",
	"./bn-bd.js": "./node_modules/moment/locale/bn-bd.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/moment/locale/en-sg.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-mx": "./node_modules/moment/locale/es-mx.js",
	"./es-mx.js": "./node_modules/moment/locale/es-mx.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fil": "./node_modules/moment/locale/fil.js",
	"./fil.js": "./node_modules/moment/locale/fil.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-deva": "./node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "./node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./oc-lnc": "./node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "./node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tk": "./node_modules/moment/locale/tk.js",
	"./tk.js": "./node_modules/moment/locale/tk.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "./node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "./node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/containers/Home/index.tsx":
/*!***************************************!*\
  !*** ./src/containers/Home/index.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst Home = () => {\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"home\"));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGFpbmVycy9Ib21lL2luZGV4LnRzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0hvbWUvaW5kZXgudHN4PzQwMmIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuY29uc3QgSG9tZSA9ICgpID0+IHtcclxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcImhvbWVcIikpO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBIb21lO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/containers/Home/index.tsx\n");

/***/ }),

/***/ "./src/containers/NoMatch/index.tsx":
/*!******************************************!*\
  !*** ./src/containers/NoMatch/index.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/button */ \"./node_modules/antd/lib/button/index.js\");\n/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/button/style/index.js */ \"./node_modules/antd/lib/button/style/index.js\");\n/* harmony import */ var antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _style_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.less */ \"./src/containers/NoMatch/style.less\");\n/* harmony import */ var _style_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_less__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\nfunction NoMatch() {\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: 'no-match' },\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd_lib_button__WEBPACK_IMPORTED_MODULE_1___default.a, null, \"\\u6682\\u65E0\\u5339\\u914D\\u9875\")));\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (NoMatch);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGFpbmVycy9Ob01hdGNoL2luZGV4LnRzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL05vTWF0Y2gvaW5kZXgudHN4PzJhMzQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tIFwiYW50ZC9saWIvYnV0dG9uXCI7XHJcbmltcG9ydCBcImFudGQvbGliL2J1dHRvbi9zdHlsZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgJy4vc3R5bGUubGVzcyc7XHJcbmZ1bmN0aW9uIE5vTWF0Y2goKSB7XHJcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICduby1tYXRjaCcgfSxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgbnVsbCwgXCJcXHU2NjgyXFx1NjVFMFxcdTUzMzlcXHU5MTREXFx1OTg3NVwiKSkpO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IE5vTWF0Y2g7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/containers/NoMatch/index.tsx\n");

/***/ }),

/***/ "./src/containers/NoMatch/style.less":
/*!*******************************************!*\
  !*** ./src/containers/NoMatch/style.less ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(true) {\n      // 1626923624496\n      var cssReload = __webpack_require__(/*! ../../../node_modules/css-hot-loader/hotModuleReplacement.js */ \"./node_modules/css-hot-loader/hotModuleReplacement.js\")(module.i, {\"fileMap\":\"{fileName}\"});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);;\n    }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGFpbmVycy9Ob01hdGNoL3N0eWxlLmxlc3MuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9Ob01hdGNoL3N0eWxlLmxlc3M/M2I4YyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNjI2OTIzNjI0NDk2XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/containers/NoMatch/style.less\n");

/***/ }),

/***/ "./src/containers/Test/index.tsx":
/*!***************************************!*\
  !*** ./src/containers/Test/index.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/button */ \"./node_modules/antd/lib/button/index.js\");\n/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/button/style/index.js */ \"./node_modules/antd/lib/button/style/index.js\");\n/* harmony import */ var antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _jsm_libs_stats_module_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../jsm/libs/stats.module.js */ \"./src/jsm/libs/stats.module.js\");\n/* harmony import */ var _jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../jsm/controls/OrbitControls.js */ \"./src/jsm/controls/OrbitControls.js\");\n/* harmony import */ var _jsm_loaders_RGBELoader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../jsm/loaders/RGBELoader.js */ \"./src/jsm/loaders/RGBELoader.js\");\n/* harmony import */ var _style_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style.less */ \"./src/containers/Test/style.less\");\n/* harmony import */ var _style_less__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_style_less__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _public_textures_equirectangular_pedestrian_overpass_1k_hdr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../public/textures/equirectangular/pedestrian_overpass_1k.hdr */ \"./src/public/textures/equirectangular/pedestrian_overpass_1k.hdr\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// import { useThree, useLoader } from 'react-three-fiber'\r\n\r\nfunction Test() {\r\n    Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\r\n        init();\r\n        animate();\r\n    });\r\n    let container, stats;\r\n    let camera, scene, renderer;\r\n    let particleLight;\r\n    function init() {\r\n        container = document.createElement('div');\r\n        document.body.appendChild(container);\r\n        camera = new three__WEBPACK_IMPORTED_MODULE_8__[\"PerspectiveCamera\"](40, window.innerWidth / window.innerHeight, 1, 2500);\r\n        camera.position.set(0.0, 400, 400 * 3.5);\r\n        //\r\n        scene = new three__WEBPACK_IMPORTED_MODULE_8__[\"Scene\"]();\r\n        let hdrCubeRenderTarget = null;\r\n        new _jsm_loaders_RGBELoader_js__WEBPACK_IMPORTED_MODULE_5__[\"RGBELoader\"]()\r\n            .setDataType(three__WEBPACK_IMPORTED_MODULE_8__[\"UnsignedByteType\"])\r\n            .load(_public_textures_equirectangular_pedestrian_overpass_1k_hdr__WEBPACK_IMPORTED_MODULE_7__[\"default\"], function (hdrEquirect) {\r\n            hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquirect);\r\n            hdrEquirect.dispose();\r\n            pmremGenerator.dispose();\r\n            // Materials\r\n            const cubeWidth = 400;\r\n            const numberOfSphersPerSide = 1;\r\n            const sphereRadius = (cubeWidth / numberOfSphersPerSide) * 0.8 * 0.5;\r\n            const stepSize = 1.0 / numberOfSphersPerSide;\r\n            const geometry = new three__WEBPACK_IMPORTED_MODULE_8__[\"BoxGeometry\"](200, 200, 200);\r\n            let index = 0;\r\n            for (let alpha = 0; alpha <= 1.0; alpha += stepSize) {\r\n                for (let beta = 0; beta <= 1.0; beta += stepSize) {\r\n                    for (let gamma = 0; gamma <= 1.0; gamma += stepSize) {\r\n                        const diffuseColor = new three__WEBPACK_IMPORTED_MODULE_8__[\"Color\"]().setHSL(alpha, 0.5, 0.25);\r\n                        const material = new three__WEBPACK_IMPORTED_MODULE_8__[\"MeshPhysicalMaterial\"]({\r\n                            metalness: .9,\r\n                            roughness: .05,\r\n                            envMapIntensity: 0.9,\r\n                            clearcoat: 1,\r\n                            transparent: true,\r\n                            // transmission: .95,\r\n                            opacity: .5,\r\n                            reflectivity: 0.2,\r\n                            refractionRatio: 0.985,\r\n                            ior: 0.9,\r\n                            side: three__WEBPACK_IMPORTED_MODULE_8__[\"BackSide\"],\r\n                            color: diffuseColor,\r\n                            // metalness: 0,\r\n                            // roughness: 0.5,\r\n                            // clearcoat: 1.0 - alpha,\r\n                            clearcoatRoughness: 1.0 - beta,\r\n                            // reflectivity: 1.0 - gamma,\r\n                            envMap: (index % 2) == 1 ? hdrCubeRenderTarget.texture : null\r\n                        });\r\n                        index++;\r\n                        const mesh = new three__WEBPACK_IMPORTED_MODULE_8__[\"Mesh\"](geometry, material);\r\n                        mesh.position.x = alpha * 400 - 200;\r\n                        mesh.position.y = beta * 400 - 200;\r\n                        mesh.position.z = gamma * 400 - 200;\r\n                        scene.add(mesh);\r\n                    }\r\n                    index++;\r\n                }\r\n                index++;\r\n            }\r\n            scene.background = hdrCubeRenderTarget.texture;\r\n        });\r\n        function addLabel(name, location) {\r\n            const textGeo = new three__WEBPACK_IMPORTED_MODULE_8__[\"TextGeometry\"](name, {\r\n                size: 20,\r\n                height: 1,\r\n                curveSegments: 1\r\n            });\r\n            const textMaterial = new three__WEBPACK_IMPORTED_MODULE_8__[\"MeshBasicMaterial\"]({ color: 0xffffff });\r\n            const textMesh = new three__WEBPACK_IMPORTED_MODULE_8__[\"Mesh\"](textGeo, textMaterial);\r\n            textMesh.position.copy(location);\r\n            scene.add(textMesh);\r\n        }\r\n        addLabel(\"+clearcoat\", new three__WEBPACK_IMPORTED_MODULE_8__[\"Vector3\"](-350, 0, 0));\r\n        addLabel(\"-clearcoat\", new three__WEBPACK_IMPORTED_MODULE_8__[\"Vector3\"](350, 0, 0));\r\n        addLabel(\"+clearcoatRoughness\", new three__WEBPACK_IMPORTED_MODULE_8__[\"Vector3\"](0, -300, 0));\r\n        addLabel(\"-clearcoatRoughness\", new three__WEBPACK_IMPORTED_MODULE_8__[\"Vector3\"](0, 300, 0));\r\n        addLabel(\"+reflectivity\", new three__WEBPACK_IMPORTED_MODULE_8__[\"Vector3\"](0, 0, -300));\r\n        addLabel(\"-reflectivity\", new three__WEBPACK_IMPORTED_MODULE_8__[\"Vector3\"](0, 0, 300));\r\n        particleLight = new three__WEBPACK_IMPORTED_MODULE_8__[\"Mesh\"](new three__WEBPACK_IMPORTED_MODULE_8__[\"SphereGeometry\"](4, 8, 8), new three__WEBPACK_IMPORTED_MODULE_8__[\"MeshBasicMaterial\"]({ color: 0xffffff }));\r\n        scene.add(particleLight);\r\n        // Lights\r\n        scene.add(new three__WEBPACK_IMPORTED_MODULE_8__[\"AmbientLight\"](0x222222));\r\n        const directionalLight = new three__WEBPACK_IMPORTED_MODULE_8__[\"DirectionalLight\"](0xffffff, 1);\r\n        directionalLight.position.set(1, 1, 1).normalize();\r\n        scene.add(directionalLight);\r\n        const pointLight = new three__WEBPACK_IMPORTED_MODULE_8__[\"PointLight\"](0xffffff, 2, 800);\r\n        particleLight.add(pointLight);\r\n        //\r\n        renderer = new three__WEBPACK_IMPORTED_MODULE_8__[\"WebGLRenderer\"]({ antialias: true });\r\n        renderer.setPixelRatio(window.devicePixelRatio);\r\n        renderer.setSize(window.innerWidth, window.innerHeight);\r\n        container.appendChild(renderer.domElement);\r\n        renderer.outputEncoding = three__WEBPACK_IMPORTED_MODULE_8__[\"sRGBEncoding\"];\r\n        renderer.toneMapping = three__WEBPACK_IMPORTED_MODULE_8__[\"ACESFilmicToneMapping\"];\r\n        renderer.toneMappingExposure = 0.75;\r\n        //\r\n        const pmremGenerator = new three__WEBPACK_IMPORTED_MODULE_8__[\"PMREMGenerator\"](renderer);\r\n        pmremGenerator.compileEquirectangularShader();\r\n        //\r\n        stats = new _jsm_libs_stats_module_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\n        container.appendChild(stats.dom);\r\n        const controls = new _jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_4__[\"OrbitControls\"](camera, renderer.domElement);\r\n        controls.minDistance = 200;\r\n        controls.maxDistance = 2000;\r\n        window.addEventListener('resize', onWindowResize);\r\n    }\r\n    function onWindowResize() {\r\n        camera.aspect = window.innerWidth / window.innerHeight;\r\n        camera.updateProjectionMatrix();\r\n        renderer.setSize(window.innerWidth, window.innerHeight);\r\n    }\r\n    //\r\n    function animate() {\r\n        requestAnimationFrame(animate);\r\n        render();\r\n        stats.update();\r\n    }\r\n    function render() {\r\n        const timer = Date.now() * 0.00025;\r\n        //camera.position.x = Math.cos( timer ) * 800;\r\n        //camera.position.z = Math.sin( timer ) * 800;\r\n        camera.lookAt(scene.position);\r\n        particleLight.position.x = Math.sin(timer * 7) * 300;\r\n        particleLight.position.y = Math.cos(timer * 5) * 400;\r\n        particleLight.position.z = Math.cos(timer * 3) * 300;\r\n        renderer.render(scene, camera);\r\n    }\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: \"container\" }));\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Test);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGFpbmVycy9UZXN0L2luZGV4LnRzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1Rlc3QvaW5kZXgudHN4PzQwY2IiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tIFwiYW50ZC9saWIvYnV0dG9uXCI7XHJcbmltcG9ydCBcImFudGQvbGliL2J1dHRvbi9zdHlsZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgU3RhdHMgZnJvbSAnLi4vLi4vanNtL2xpYnMvc3RhdHMubW9kdWxlLmpzJztcclxuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJy4uLy4uL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzLmpzJztcclxuaW1wb3J0IHsgUkdCRUxvYWRlciB9IGZyb20gJy4uLy4uL2pzbS9sb2FkZXJzL1JHQkVMb2FkZXIuanMnO1xyXG5pbXBvcnQgJy4vc3R5bGUubGVzcyc7XHJcbmltcG9ydCBoZHJVcmwgZnJvbSAnLi4vLi4vcHVibGljL3RleHR1cmVzL2VxdWlyZWN0YW5ndWxhci9wZWRlc3RyaWFuX292ZXJwYXNzXzFrLmhkcic7XHJcbi8vIGltcG9ydCB7IHVzZVRocmVlLCB1c2VMb2FkZXIgfSBmcm9tICdyZWFjdC10aHJlZS1maWJlcidcclxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5mdW5jdGlvbiBUZXN0KCkge1xyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpbml0KCk7XHJcbiAgICAgICAgYW5pbWF0ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgY29udGFpbmVyLCBzdGF0cztcclxuICAgIGxldCBjYW1lcmEsIHNjZW5lLCByZW5kZXJlcjtcclxuICAgIGxldCBwYXJ0aWNsZUxpZ2h0O1xyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICAgICAgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDQwLCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMSwgMjUwMCk7XHJcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnNldCgwLjAsIDQwMCwgNDAwICogMy41KTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XHJcbiAgICAgICAgbGV0IGhkckN1YmVSZW5kZXJUYXJnZXQgPSBudWxsO1xyXG4gICAgICAgIG5ldyBSR0JFTG9hZGVyKClcclxuICAgICAgICAgICAgLnNldERhdGFUeXBlKFRIUkVFLlVuc2lnbmVkQnl0ZVR5cGUpXHJcbiAgICAgICAgICAgIC5sb2FkKGhkclVybCwgZnVuY3Rpb24gKGhkckVxdWlyZWN0KSB7XHJcbiAgICAgICAgICAgIGhkckN1YmVSZW5kZXJUYXJnZXQgPSBwbXJlbUdlbmVyYXRvci5mcm9tRXF1aXJlY3Rhbmd1bGFyKGhkckVxdWlyZWN0KTtcclxuICAgICAgICAgICAgaGRyRXF1aXJlY3QuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICBwbXJlbUdlbmVyYXRvci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIC8vIE1hdGVyaWFsc1xyXG4gICAgICAgICAgICBjb25zdCBjdWJlV2lkdGggPSA0MDA7XHJcbiAgICAgICAgICAgIGNvbnN0IG51bWJlck9mU3BoZXJzUGVyU2lkZSA9IDE7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwaGVyZVJhZGl1cyA9IChjdWJlV2lkdGggLyBudW1iZXJPZlNwaGVyc1BlclNpZGUpICogMC44ICogMC41O1xyXG4gICAgICAgICAgICBjb25zdCBzdGVwU2l6ZSA9IDEuMCAvIG51bWJlck9mU3BoZXJzUGVyU2lkZTtcclxuICAgICAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMjAwLCAyMDAsIDIwMCk7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGFscGhhID0gMDsgYWxwaGEgPD0gMS4wOyBhbHBoYSArPSBzdGVwU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYmV0YSA9IDA7IGJldGEgPD0gMS4wOyBiZXRhICs9IHN0ZXBTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZ2FtbWEgPSAwOyBnYW1tYSA8PSAxLjA7IGdhbW1hICs9IHN0ZXBTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZ1c2VDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpLnNldEhTTChhbHBoYSwgMC41LCAwLjI1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBoeXNpY2FsTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWxuZXNzOiAuOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdWdobmVzczogLjA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW52TWFwSW50ZW5zaXR5OiAwLjksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhcmNvYXQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRyYW5zbWlzc2lvbjogLjk1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZsZWN0aXZpdHk6IDAuMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJhY3Rpb25SYXRpbzogMC45ODUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpb3I6IDAuOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZGU6IFRIUkVFLkJhY2tTaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGRpZmZ1c2VDb2xvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ldGFsbmVzczogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJvdWdobmVzczogMC41LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xlYXJjb2F0OiAxLjAgLSBhbHBoYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyY29hdFJvdWdobmVzczogMS4wIC0gYmV0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlZmxlY3Rpdml0eTogMS4wIC0gZ2FtbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnZNYXA6IChpbmRleCAlIDIpID09IDEgPyBoZHJDdWJlUmVuZGVyVGFyZ2V0LnRleHR1cmUgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaC5wb3NpdGlvbi54ID0gYWxwaGEgKiA0MDAgLSAyMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2gucG9zaXRpb24ueSA9IGJldGEgKiA0MDAgLSAyMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2gucG9zaXRpb24ueiA9IGdhbW1hICogNDAwIC0gMjAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2VuZS5hZGQobWVzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBoZHJDdWJlUmVuZGVyVGFyZ2V0LnRleHR1cmU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZnVuY3Rpb24gYWRkTGFiZWwobmFtZSwgbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgdGV4dEdlbyA9IG5ldyBUSFJFRS5UZXh0R2VvbWV0cnkobmFtZSwge1xyXG4gICAgICAgICAgICAgICAgc2l6ZTogMjAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXHJcbiAgICAgICAgICAgICAgICBjdXJ2ZVNlZ21lbnRzOiAxXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0TWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHRNZXNoID0gbmV3IFRIUkVFLk1lc2godGV4dEdlbywgdGV4dE1hdGVyaWFsKTtcclxuICAgICAgICAgICAgdGV4dE1lc2gucG9zaXRpb24uY29weShsb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHNjZW5lLmFkZCh0ZXh0TWVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFkZExhYmVsKFwiK2NsZWFyY29hdFwiLCBuZXcgVEhSRUUuVmVjdG9yMygtMzUwLCAwLCAwKSk7XHJcbiAgICAgICAgYWRkTGFiZWwoXCItY2xlYXJjb2F0XCIsIG5ldyBUSFJFRS5WZWN0b3IzKDM1MCwgMCwgMCkpO1xyXG4gICAgICAgIGFkZExhYmVsKFwiK2NsZWFyY29hdFJvdWdobmVzc1wiLCBuZXcgVEhSRUUuVmVjdG9yMygwLCAtMzAwLCAwKSk7XHJcbiAgICAgICAgYWRkTGFiZWwoXCItY2xlYXJjb2F0Um91Z2huZXNzXCIsIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDMwMCwgMCkpO1xyXG4gICAgICAgIGFkZExhYmVsKFwiK3JlZmxlY3Rpdml0eVwiLCBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAtMzAwKSk7XHJcbiAgICAgICAgYWRkTGFiZWwoXCItcmVmbGVjdGl2aXR5XCIsIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDMwMCkpO1xyXG4gICAgICAgIHBhcnRpY2xlTGlnaHQgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoNCwgOCwgOCksIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KSk7XHJcbiAgICAgICAgc2NlbmUuYWRkKHBhcnRpY2xlTGlnaHQpO1xyXG4gICAgICAgIC8vIExpZ2h0c1xyXG4gICAgICAgIHNjZW5lLmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4MjIyMjIyKSk7XHJcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uYWxMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAxKTtcclxuICAgICAgICBkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLnNldCgxLCAxLCAxKS5ub3JtYWxpemUoKTtcclxuICAgICAgICBzY2VuZS5hZGQoZGlyZWN0aW9uYWxMaWdodCk7XHJcbiAgICAgICAgY29uc3QgcG9pbnRMaWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmZmZmZmLCAyLCA4MDApO1xyXG4gICAgICAgIHBhcnRpY2xlTGlnaHQuYWRkKHBvaW50TGlnaHQpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KTtcclxuICAgICAgICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcclxuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcclxuICAgICAgICByZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZztcclxuICAgICAgICByZW5kZXJlci50b25lTWFwcGluZyA9IFRIUkVFLkFDRVNGaWxtaWNUb25lTWFwcGluZztcclxuICAgICAgICByZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlID0gMC43NTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGNvbnN0IHBtcmVtR2VuZXJhdG9yID0gbmV3IFRIUkVFLlBNUkVNR2VuZXJhdG9yKHJlbmRlcmVyKTtcclxuICAgICAgICBwbXJlbUdlbmVyYXRvci5jb21waWxlRXF1aXJlY3Rhbmd1bGFyU2hhZGVyKCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBzdGF0cyA9IG5ldyBTdGF0cygpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGF0cy5kb20pO1xyXG4gICAgICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcclxuICAgICAgICBjb250cm9scy5taW5EaXN0YW5jZSA9IDIwMDtcclxuICAgICAgICBjb250cm9scy5tYXhEaXN0YW5jZSA9IDIwMDA7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uV2luZG93UmVzaXplKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xyXG4gICAgICAgIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xyXG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICB9XHJcbiAgICAvL1xyXG4gICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgICAgc3RhdHMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgdGltZXIgPSBEYXRlLm5vdygpICogMC4wMDAyNTtcclxuICAgICAgICAvL2NhbWVyYS5wb3NpdGlvbi54ID0gTWF0aC5jb3MoIHRpbWVyICkgKiA4MDA7XHJcbiAgICAgICAgLy9jYW1lcmEucG9zaXRpb24ueiA9IE1hdGguc2luKCB0aW1lciApICogODAwO1xyXG4gICAgICAgIGNhbWVyYS5sb29rQXQoc2NlbmUucG9zaXRpb24pO1xyXG4gICAgICAgIHBhcnRpY2xlTGlnaHQucG9zaXRpb24ueCA9IE1hdGguc2luKHRpbWVyICogNykgKiAzMDA7XHJcbiAgICAgICAgcGFydGljbGVMaWdodC5wb3NpdGlvbi55ID0gTWF0aC5jb3ModGltZXIgKiA1KSAqIDQwMDtcclxuICAgICAgICBwYXJ0aWNsZUxpZ2h0LnBvc2l0aW9uLnogPSBNYXRoLmNvcyh0aW1lciAqIDMpICogMzAwO1xyXG4gICAgICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcclxuICAgIH1cclxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcImNvbnRhaW5lclwiIH0pKTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBUZXN0O1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/containers/Test/index.tsx\n");

/***/ }),

/***/ "./src/containers/Test/style.less":
/*!****************************************!*\
  !*** ./src/containers/Test/style.less ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(true) {\n      // 1626923624502\n      var cssReload = __webpack_require__(/*! ../../../node_modules/css-hot-loader/hotModuleReplacement.js */ \"./node_modules/css-hot-loader/hotModuleReplacement.js\")(module.i, {\"fileMap\":\"{fileName}\"});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);;\n    }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGFpbmVycy9UZXN0L3N0eWxlLmxlc3MuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9UZXN0L3N0eWxlLmxlc3M/Y2EwMSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNjI2OTIzNjI0NTAyXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/containers/Test/style.less\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ \"./src/router.tsx\");\n\n\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(\n/*#__PURE__*/\nreact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), document.getElementById('root'));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/MWYwOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgQXBwIGZyb20gJy4vcm91dGVyJztcblJlYWN0RE9NLnJlbmRlcihcbi8qI19fUFVSRV9fKi9cblJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBwLCBudWxsKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/jsm/controls/OrbitControls.js":
/*!*******************************************!*\
  !*** ./src/jsm/controls/OrbitControls.js ***!
  \*******************************************/
/*! exports provided: OrbitControls, MapControls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OrbitControls\", function() { return OrbitControls; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MapControls\", function() { return MapControls; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n // This set of controls performs orbiting, dollying (zooming), and panning.\n// Unlike TrackballControls, it maintains the \"up\" direction object.up (+Y by default).\n//\n//    Orbit - left mouse / touch: one-finger move\n//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish\n//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move\n\nconst _changeEvent = {\n  type: 'change'\n};\nconst _startEvent = {\n  type: 'start'\n};\nconst _endEvent = {\n  type: 'end'\n};\n\nclass OrbitControls extends three__WEBPACK_IMPORTED_MODULE_0__[\"EventDispatcher\"] {\n  constructor(object, domElement) {\n    super();\n    if (domElement === undefined) console.warn('THREE.OrbitControls: The second parameter \"domElement\" is now mandatory.');\n    if (domElement === document) console.error('THREE.OrbitControls: \"document\" should not be used as the target \"domElement\". Please use \"renderer.domElement\" instead.');\n    this.object = object;\n    this.domElement = domElement;\n    this.domElement.style.touchAction = 'none'; // disable touch scroll\n    // Set to false to disable this control\n\n    this.enabled = true; // \"target\" sets the location of focus, where the object orbits around\n\n    this.target = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](); // How far you can dolly in and out ( PerspectiveCamera only )\n\n    this.minDistance = 0;\n    this.maxDistance = Infinity; // How far you can zoom in and out ( OrthographicCamera only )\n\n    this.minZoom = 0;\n    this.maxZoom = Infinity; // How far you can orbit vertically, upper and lower limits.\n    // Range is 0 to Math.PI radians.\n\n    this.minPolarAngle = 0; // radians\n\n    this.maxPolarAngle = Math.PI; // radians\n    // How far you can orbit horizontally, upper and lower limits.\n    // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )\n\n    this.minAzimuthAngle = -Infinity; // radians\n\n    this.maxAzimuthAngle = Infinity; // radians\n    // Set to true to enable damping (inertia)\n    // If damping is enabled, you must call controls.update() in your animation loop\n\n    this.enableDamping = false;\n    this.dampingFactor = 0.05; // This option actually enables dollying in and out; left as \"zoom\" for backwards compatibility.\n    // Set to false to disable zooming\n\n    this.enableZoom = true;\n    this.zoomSpeed = 1.0; // Set to false to disable rotating\n\n    this.enableRotate = true;\n    this.rotateSpeed = 1.0; // Set to false to disable panning\n\n    this.enablePan = true;\n    this.panSpeed = 1.0;\n    this.screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up\n\n    this.keyPanSpeed = 7.0; // pixels moved per arrow key push\n    // Set to true to automatically rotate around the target\n    // If auto-rotate is enabled, you must call controls.update() in your animation loop\n\n    this.autoRotate = false;\n    this.autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60\n    // The four arrow keys\n\n    this.keys = {\n      LEFT: 'ArrowLeft',\n      UP: 'ArrowUp',\n      RIGHT: 'ArrowRight',\n      BOTTOM: 'ArrowDown'\n    }; // Mouse buttons\n\n    this.mouseButtons = {\n      LEFT: three__WEBPACK_IMPORTED_MODULE_0__[\"MOUSE\"].ROTATE,\n      MIDDLE: three__WEBPACK_IMPORTED_MODULE_0__[\"MOUSE\"].DOLLY,\n      RIGHT: three__WEBPACK_IMPORTED_MODULE_0__[\"MOUSE\"].PAN\n    }; // Touch fingers\n\n    this.touches = {\n      ONE: three__WEBPACK_IMPORTED_MODULE_0__[\"TOUCH\"].ROTATE,\n      TWO: three__WEBPACK_IMPORTED_MODULE_0__[\"TOUCH\"].DOLLY_PAN\n    }; // for reset\n\n    this.target0 = this.target.clone();\n    this.position0 = this.object.position.clone();\n    this.zoom0 = this.object.zoom; // the target DOM element for key events\n\n    this._domElementKeyEvents = null; //\n    // public methods\n    //\n\n    this.getPolarAngle = function () {\n      return spherical.phi;\n    };\n\n    this.getAzimuthalAngle = function () {\n      return spherical.theta;\n    };\n\n    this.listenToKeyEvents = function (domElement) {\n      domElement.addEventListener('keydown', onKeyDown);\n      this._domElementKeyEvents = domElement;\n    };\n\n    this.saveState = function () {\n      scope.target0.copy(scope.target);\n      scope.position0.copy(scope.object.position);\n      scope.zoom0 = scope.object.zoom;\n    };\n\n    this.reset = function () {\n      scope.target.copy(scope.target0);\n      scope.object.position.copy(scope.position0);\n      scope.object.zoom = scope.zoom0;\n      scope.object.updateProjectionMatrix();\n      scope.dispatchEvent(_changeEvent);\n      scope.update();\n      state = STATE.NONE;\n    }; // this method is exposed, but perhaps it would be better if we can make it private...\n\n\n    this.update = function () {\n      const offset = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](); // so camera.up is the orbit axis\n\n      const quat = new three__WEBPACK_IMPORTED_MODULE_0__[\"Quaternion\"]().setFromUnitVectors(object.up, new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0));\n      const quatInverse = quat.clone().invert();\n      const lastPosition = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"]();\n      const lastQuaternion = new three__WEBPACK_IMPORTED_MODULE_0__[\"Quaternion\"]();\n      const twoPI = 2 * Math.PI;\n      return function update() {\n        const position = scope.object.position;\n        offset.copy(position).sub(scope.target); // rotate offset to \"y-axis-is-up\" space\n\n        offset.applyQuaternion(quat); // angle from z-axis around y-axis\n\n        spherical.setFromVector3(offset);\n\n        if (scope.autoRotate && state === STATE.NONE) {\n          rotateLeft(getAutoRotationAngle());\n        }\n\n        if (scope.enableDamping) {\n          spherical.theta += sphericalDelta.theta * scope.dampingFactor;\n          spherical.phi += sphericalDelta.phi * scope.dampingFactor;\n        } else {\n          spherical.theta += sphericalDelta.theta;\n          spherical.phi += sphericalDelta.phi;\n        } // restrict theta to be between desired limits\n\n\n        let min = scope.minAzimuthAngle;\n        let max = scope.maxAzimuthAngle;\n\n        if (isFinite(min) && isFinite(max)) {\n          if (min < -Math.PI) min += twoPI;else if (min > Math.PI) min -= twoPI;\n          if (max < -Math.PI) max += twoPI;else if (max > Math.PI) max -= twoPI;\n\n          if (min <= max) {\n            spherical.theta = Math.max(min, Math.min(max, spherical.theta));\n          } else {\n            spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);\n          }\n        } // restrict phi to be between desired limits\n\n\n        spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));\n        spherical.makeSafe();\n        spherical.radius *= scale; // restrict radius to be between desired limits\n\n        spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius)); // move target to panned location\n\n        if (scope.enableDamping === true) {\n          scope.target.addScaledVector(panOffset, scope.dampingFactor);\n        } else {\n          scope.target.add(panOffset);\n        }\n\n        offset.setFromSpherical(spherical); // rotate offset back to \"camera-up-vector-is-up\" space\n\n        offset.applyQuaternion(quatInverse);\n        position.copy(scope.target).add(offset);\n        scope.object.lookAt(scope.target);\n\n        if (scope.enableDamping === true) {\n          sphericalDelta.theta *= 1 - scope.dampingFactor;\n          sphericalDelta.phi *= 1 - scope.dampingFactor;\n          panOffset.multiplyScalar(1 - scope.dampingFactor);\n        } else {\n          sphericalDelta.set(0, 0, 0);\n          panOffset.set(0, 0, 0);\n        }\n\n        scale = 1; // update condition is:\n        // min(camera displacement, camera rotation in radians)^2 > EPS\n        // using small-angle approximation cos(x/2) = 1 - x^2 / 8\n\n        if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {\n          scope.dispatchEvent(_changeEvent);\n          lastPosition.copy(scope.object.position);\n          lastQuaternion.copy(scope.object.quaternion);\n          zoomChanged = false;\n          return true;\n        }\n\n        return false;\n      };\n    }();\n\n    this.dispose = function () {\n      scope.domElement.removeEventListener('contextmenu', onContextMenu);\n      scope.domElement.removeEventListener('pointerdown', onPointerDown);\n      scope.domElement.removeEventListener('pointercancel', onPointerCancel);\n      scope.domElement.removeEventListener('wheel', onMouseWheel);\n      scope.domElement.removeEventListener('pointermove', onPointerMove);\n      scope.domElement.removeEventListener('pointerup', onPointerUp);\n\n      if (scope._domElementKeyEvents !== null) {\n        scope._domElementKeyEvents.removeEventListener('keydown', onKeyDown);\n      } //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?\n\n    }; //\n    // internals\n    //\n\n\n    const scope = this;\n    const STATE = {\n      NONE: -1,\n      ROTATE: 0,\n      DOLLY: 1,\n      PAN: 2,\n      TOUCH_ROTATE: 3,\n      TOUCH_PAN: 4,\n      TOUCH_DOLLY_PAN: 5,\n      TOUCH_DOLLY_ROTATE: 6\n    };\n    let state = STATE.NONE;\n    const EPS = 0.000001; // current position in spherical coordinates\n\n    const spherical = new three__WEBPACK_IMPORTED_MODULE_0__[\"Spherical\"]();\n    const sphericalDelta = new three__WEBPACK_IMPORTED_MODULE_0__[\"Spherical\"]();\n    let scale = 1;\n    const panOffset = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"]();\n    let zoomChanged = false;\n    const rotateStart = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]();\n    const rotateEnd = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]();\n    const rotateDelta = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]();\n    const panStart = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]();\n    const panEnd = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]();\n    const panDelta = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]();\n    const dollyStart = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]();\n    const dollyEnd = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]();\n    const dollyDelta = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]();\n    const pointers = [];\n    const pointerPositions = {};\n\n    function getAutoRotationAngle() {\n      return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;\n    }\n\n    function getZoomScale() {\n      return Math.pow(0.95, scope.zoomSpeed);\n    }\n\n    function rotateLeft(angle) {\n      sphericalDelta.theta -= angle;\n    }\n\n    function rotateUp(angle) {\n      sphericalDelta.phi -= angle;\n    }\n\n    const panLeft = function () {\n      const v = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"]();\n      return function panLeft(distance, objectMatrix) {\n        v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix\n\n        v.multiplyScalar(-distance);\n        panOffset.add(v);\n      };\n    }();\n\n    const panUp = function () {\n      const v = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"]();\n      return function panUp(distance, objectMatrix) {\n        if (scope.screenSpacePanning === true) {\n          v.setFromMatrixColumn(objectMatrix, 1);\n        } else {\n          v.setFromMatrixColumn(objectMatrix, 0);\n          v.crossVectors(scope.object.up, v);\n        }\n\n        v.multiplyScalar(distance);\n        panOffset.add(v);\n      };\n    }(); // deltaX and deltaY are in pixels; right and down are positive\n\n\n    const pan = function () {\n      const offset = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"]();\n      return function pan(deltaX, deltaY) {\n        const element = scope.domElement;\n\n        if (scope.object.isPerspectiveCamera) {\n          // perspective\n          const position = scope.object.position;\n          offset.copy(position).sub(scope.target);\n          let targetDistance = offset.length(); // half of the fov is center to top of screen\n\n          targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0); // we use only clientHeight here so aspect ratio does not distort speed\n\n          panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);\n          panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);\n        } else if (scope.object.isOrthographicCamera) {\n          // orthographic\n          panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);\n          panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);\n        } else {\n          // camera neither orthographic nor perspective\n          console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');\n          scope.enablePan = false;\n        }\n      };\n    }();\n\n    function dollyOut(dollyScale) {\n      if (scope.object.isPerspectiveCamera) {\n        scale /= dollyScale;\n      } else if (scope.object.isOrthographicCamera) {\n        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));\n        scope.object.updateProjectionMatrix();\n        zoomChanged = true;\n      } else {\n        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');\n        scope.enableZoom = false;\n      }\n    }\n\n    function dollyIn(dollyScale) {\n      if (scope.object.isPerspectiveCamera) {\n        scale *= dollyScale;\n      } else if (scope.object.isOrthographicCamera) {\n        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));\n        scope.object.updateProjectionMatrix();\n        zoomChanged = true;\n      } else {\n        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');\n        scope.enableZoom = false;\n      }\n    } //\n    // event callbacks - update the object state\n    //\n\n\n    function handleMouseDownRotate(event) {\n      rotateStart.set(event.clientX, event.clientY);\n    }\n\n    function handleMouseDownDolly(event) {\n      dollyStart.set(event.clientX, event.clientY);\n    }\n\n    function handleMouseDownPan(event) {\n      panStart.set(event.clientX, event.clientY);\n    }\n\n    function handleMouseMoveRotate(event) {\n      rotateEnd.set(event.clientX, event.clientY);\n      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);\n      const element = scope.domElement;\n      rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight); // yes, height\n\n      rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);\n      rotateStart.copy(rotateEnd);\n      scope.update();\n    }\n\n    function handleMouseMoveDolly(event) {\n      dollyEnd.set(event.clientX, event.clientY);\n      dollyDelta.subVectors(dollyEnd, dollyStart);\n\n      if (dollyDelta.y > 0) {\n        dollyOut(getZoomScale());\n      } else if (dollyDelta.y < 0) {\n        dollyIn(getZoomScale());\n      }\n\n      dollyStart.copy(dollyEnd);\n      scope.update();\n    }\n\n    function handleMouseMovePan(event) {\n      panEnd.set(event.clientX, event.clientY);\n      panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);\n      pan(panDelta.x, panDelta.y);\n      panStart.copy(panEnd);\n      scope.update();\n    }\n\n    function handleMouseUp()\n    /*event*/\n    {// no-op\n    }\n\n    function handleMouseWheel(event) {\n      if (event.deltaY < 0) {\n        dollyIn(getZoomScale());\n      } else if (event.deltaY > 0) {\n        dollyOut(getZoomScale());\n      }\n\n      scope.update();\n    }\n\n    function handleKeyDown(event) {\n      let needsUpdate = false;\n\n      switch (event.code) {\n        case scope.keys.UP:\n          pan(0, scope.keyPanSpeed);\n          needsUpdate = true;\n          break;\n\n        case scope.keys.BOTTOM:\n          pan(0, -scope.keyPanSpeed);\n          needsUpdate = true;\n          break;\n\n        case scope.keys.LEFT:\n          pan(scope.keyPanSpeed, 0);\n          needsUpdate = true;\n          break;\n\n        case scope.keys.RIGHT:\n          pan(-scope.keyPanSpeed, 0);\n          needsUpdate = true;\n          break;\n      }\n\n      if (needsUpdate) {\n        // prevent the browser from scrolling on cursor keys\n        event.preventDefault();\n        scope.update();\n      }\n    }\n\n    function handleTouchStartRotate() {\n      if (pointers.length === 1) {\n        rotateStart.set(pointers[0].pageX, pointers[0].pageY);\n      } else {\n        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);\n        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);\n        rotateStart.set(x, y);\n      }\n    }\n\n    function handleTouchStartPan() {\n      if (pointers.length === 1) {\n        panStart.set(pointers[0].pageX, pointers[0].pageY);\n      } else {\n        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);\n        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);\n        panStart.set(x, y);\n      }\n    }\n\n    function handleTouchStartDolly() {\n      const dx = pointers[0].pageX - pointers[1].pageX;\n      const dy = pointers[0].pageY - pointers[1].pageY;\n      const distance = Math.sqrt(dx * dx + dy * dy);\n      dollyStart.set(0, distance);\n    }\n\n    function handleTouchStartDollyPan() {\n      if (scope.enableZoom) handleTouchStartDolly();\n      if (scope.enablePan) handleTouchStartPan();\n    }\n\n    function handleTouchStartDollyRotate() {\n      if (scope.enableZoom) handleTouchStartDolly();\n      if (scope.enableRotate) handleTouchStartRotate();\n    }\n\n    function handleTouchMoveRotate(event) {\n      if (pointers.length == 1) {\n        rotateEnd.set(event.pageX, event.pageY);\n      } else {\n        const position = getSecondPointerPosition(event);\n        const x = 0.5 * (event.pageX + position.x);\n        const y = 0.5 * (event.pageY + position.y);\n        rotateEnd.set(x, y);\n      }\n\n      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);\n      const element = scope.domElement;\n      rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight); // yes, height\n\n      rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);\n      rotateStart.copy(rotateEnd);\n    }\n\n    function handleTouchMovePan(event) {\n      if (pointers.length === 1) {\n        panEnd.set(event.pageX, event.pageY);\n      } else {\n        const position = getSecondPointerPosition(event);\n        const x = 0.5 * (event.pageX + position.x);\n        const y = 0.5 * (event.pageY + position.y);\n        panEnd.set(x, y);\n      }\n\n      panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);\n      pan(panDelta.x, panDelta.y);\n      panStart.copy(panEnd);\n    }\n\n    function handleTouchMoveDolly(event) {\n      const position = getSecondPointerPosition(event);\n      const dx = event.pageX - position.x;\n      const dy = event.pageY - position.y;\n      const distance = Math.sqrt(dx * dx + dy * dy);\n      dollyEnd.set(0, distance);\n      dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));\n      dollyOut(dollyDelta.y);\n      dollyStart.copy(dollyEnd);\n    }\n\n    function handleTouchMoveDollyPan(event) {\n      if (scope.enableZoom) handleTouchMoveDolly(event);\n      if (scope.enablePan) handleTouchMovePan(event);\n    }\n\n    function handleTouchMoveDollyRotate(event) {\n      if (scope.enableZoom) handleTouchMoveDolly(event);\n      if (scope.enableRotate) handleTouchMoveRotate(event);\n    }\n\n    function handleTouchEnd()\n    /*event*/\n    {} // no-op\n    //\n    // event handlers - FSM: listen for events and reset state\n    //\n\n\n    function onPointerDown(event) {\n      if (scope.enabled === false) return;\n\n      if (pointers.length === 0) {\n        scope.domElement.setPointerCapture(event.pointerId);\n        scope.domElement.addEventListener('pointermove', onPointerMove);\n        scope.domElement.addEventListener('pointerup', onPointerUp);\n      } //\n\n\n      addPointer(event);\n\n      if (event.pointerType === 'touch') {\n        onTouchStart(event);\n      } else {\n        onMouseDown(event);\n      }\n    }\n\n    function onPointerMove(event) {\n      if (scope.enabled === false) return;\n\n      if (event.pointerType === 'touch') {\n        onTouchMove(event);\n      } else {\n        onMouseMove(event);\n      }\n    }\n\n    function onPointerUp(event) {\n      if (scope.enabled === false) return;\n\n      if (event.pointerType === 'touch') {\n        onTouchEnd();\n      } else {\n        onMouseUp(event);\n      }\n\n      removePointer(event); //\n\n      if (pointers.length === 0) {\n        scope.domElement.releasePointerCapture(event.pointerId);\n        scope.domElement.removeEventListener('pointermove', onPointerMove);\n        scope.domElement.removeEventListener('pointerup', onPointerUp);\n      }\n    }\n\n    function onPointerCancel(event) {\n      removePointer(event);\n    }\n\n    function onMouseDown(event) {\n      let mouseAction;\n\n      switch (event.button) {\n        case 0:\n          mouseAction = scope.mouseButtons.LEFT;\n          break;\n\n        case 1:\n          mouseAction = scope.mouseButtons.MIDDLE;\n          break;\n\n        case 2:\n          mouseAction = scope.mouseButtons.RIGHT;\n          break;\n\n        default:\n          mouseAction = -1;\n      }\n\n      switch (mouseAction) {\n        case three__WEBPACK_IMPORTED_MODULE_0__[\"MOUSE\"].DOLLY:\n          if (scope.enableZoom === false) return;\n          handleMouseDownDolly(event);\n          state = STATE.DOLLY;\n          break;\n\n        case three__WEBPACK_IMPORTED_MODULE_0__[\"MOUSE\"].ROTATE:\n          if (event.ctrlKey || event.metaKey || event.shiftKey) {\n            if (scope.enablePan === false) return;\n            handleMouseDownPan(event);\n            state = STATE.PAN;\n          } else {\n            if (scope.enableRotate === false) return;\n            handleMouseDownRotate(event);\n            state = STATE.ROTATE;\n          }\n\n          break;\n\n        case three__WEBPACK_IMPORTED_MODULE_0__[\"MOUSE\"].PAN:\n          if (event.ctrlKey || event.metaKey || event.shiftKey) {\n            if (scope.enableRotate === false) return;\n            handleMouseDownRotate(event);\n            state = STATE.ROTATE;\n          } else {\n            if (scope.enablePan === false) return;\n            handleMouseDownPan(event);\n            state = STATE.PAN;\n          }\n\n          break;\n\n        default:\n          state = STATE.NONE;\n      }\n\n      if (state !== STATE.NONE) {\n        scope.dispatchEvent(_startEvent);\n      }\n    }\n\n    function onMouseMove(event) {\n      if (scope.enabled === false) return;\n\n      switch (state) {\n        case STATE.ROTATE:\n          if (scope.enableRotate === false) return;\n          handleMouseMoveRotate(event);\n          break;\n\n        case STATE.DOLLY:\n          if (scope.enableZoom === false) return;\n          handleMouseMoveDolly(event);\n          break;\n\n        case STATE.PAN:\n          if (scope.enablePan === false) return;\n          handleMouseMovePan(event);\n          break;\n      }\n    }\n\n    function onMouseUp(event) {\n      handleMouseUp(event);\n      scope.dispatchEvent(_endEvent);\n      state = STATE.NONE;\n    }\n\n    function onMouseWheel(event) {\n      if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) return;\n      event.preventDefault();\n      scope.dispatchEvent(_startEvent);\n      handleMouseWheel(event);\n      scope.dispatchEvent(_endEvent);\n    }\n\n    function onKeyDown(event) {\n      if (scope.enabled === false || scope.enablePan === false) return;\n      handleKeyDown(event);\n    }\n\n    function onTouchStart(event) {\n      trackPointer(event);\n\n      switch (pointers.length) {\n        case 1:\n          switch (scope.touches.ONE) {\n            case three__WEBPACK_IMPORTED_MODULE_0__[\"TOUCH\"].ROTATE:\n              if (scope.enableRotate === false) return;\n              handleTouchStartRotate();\n              state = STATE.TOUCH_ROTATE;\n              break;\n\n            case three__WEBPACK_IMPORTED_MODULE_0__[\"TOUCH\"].PAN:\n              if (scope.enablePan === false) return;\n              handleTouchStartPan();\n              state = STATE.TOUCH_PAN;\n              break;\n\n            default:\n              state = STATE.NONE;\n          }\n\n          break;\n\n        case 2:\n          switch (scope.touches.TWO) {\n            case three__WEBPACK_IMPORTED_MODULE_0__[\"TOUCH\"].DOLLY_PAN:\n              if (scope.enableZoom === false && scope.enablePan === false) return;\n              handleTouchStartDollyPan();\n              state = STATE.TOUCH_DOLLY_PAN;\n              break;\n\n            case three__WEBPACK_IMPORTED_MODULE_0__[\"TOUCH\"].DOLLY_ROTATE:\n              if (scope.enableZoom === false && scope.enableRotate === false) return;\n              handleTouchStartDollyRotate();\n              state = STATE.TOUCH_DOLLY_ROTATE;\n              break;\n\n            default:\n              state = STATE.NONE;\n          }\n\n          break;\n\n        default:\n          state = STATE.NONE;\n      }\n\n      if (state !== STATE.NONE) {\n        scope.dispatchEvent(_startEvent);\n      }\n    }\n\n    function onTouchMove(event) {\n      trackPointer(event);\n\n      switch (state) {\n        case STATE.TOUCH_ROTATE:\n          if (scope.enableRotate === false) return;\n          handleTouchMoveRotate(event);\n          scope.update();\n          break;\n\n        case STATE.TOUCH_PAN:\n          if (scope.enablePan === false) return;\n          handleTouchMovePan(event);\n          scope.update();\n          break;\n\n        case STATE.TOUCH_DOLLY_PAN:\n          if (scope.enableZoom === false && scope.enablePan === false) return;\n          handleTouchMoveDollyPan(event);\n          scope.update();\n          break;\n\n        case STATE.TOUCH_DOLLY_ROTATE:\n          if (scope.enableZoom === false && scope.enableRotate === false) return;\n          handleTouchMoveDollyRotate(event);\n          scope.update();\n          break;\n\n        default:\n          state = STATE.NONE;\n      }\n    }\n\n    function onTouchEnd(event) {\n      handleTouchEnd(event);\n      scope.dispatchEvent(_endEvent);\n      state = STATE.NONE;\n    }\n\n    function onContextMenu(event) {\n      if (scope.enabled === false) return;\n      event.preventDefault();\n    }\n\n    function addPointer(event) {\n      pointers.push(event);\n    }\n\n    function removePointer(event) {\n      delete pointerPositions[event.pointerId];\n\n      for (let i = 0; i < pointers.length; i++) {\n        if (pointers[i].pointerId == event.pointerId) {\n          pointers.splice(i, 1);\n          return;\n        }\n      }\n    }\n\n    function trackPointer(event) {\n      let position = pointerPositions[event.pointerId];\n\n      if (position === undefined) {\n        position = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]();\n        pointerPositions[event.pointerId] = position;\n      }\n\n      position.set(event.pageX, event.pageY);\n    }\n\n    function getSecondPointerPosition(event) {\n      const pointer = event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0];\n      return pointerPositions[pointer.pointerId];\n    } //\n\n\n    scope.domElement.addEventListener('contextmenu', onContextMenu);\n    scope.domElement.addEventListener('pointerdown', onPointerDown);\n    scope.domElement.addEventListener('pointercancel', onPointerCancel);\n    scope.domElement.addEventListener('wheel', onMouseWheel, {\n      passive: false\n    }); // force an update at start\n\n    this.update();\n  }\n\n} // This set of controls performs orbiting, dollying (zooming), and panning.\n// Unlike TrackballControls, it maintains the \"up\" direction object.up (+Y by default).\n// This is very similar to OrbitControls, another set of touch behavior\n//\n//    Orbit - right mouse, or left mouse + ctrl/meta/shiftKey / touch: two-finger rotate\n//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish\n//    Pan - left mouse, or arrow keys / touch: one-finger move\n\n\nclass MapControls extends OrbitControls {\n  constructor(object, domElement) {\n    super(object, domElement);\n    this.screenSpacePanning = false; // pan orthogonal to world-space direction camera.up\n\n    this.mouseButtons.LEFT = three__WEBPACK_IMPORTED_MODULE_0__[\"MOUSE\"].PAN;\n    this.mouseButtons.RIGHT = three__WEBPACK_IMPORTED_MODULE_0__[\"MOUSE\"].ROTATE;\n    this.touches.ONE = three__WEBPACK_IMPORTED_MODULE_0__[\"TOUCH\"].PAN;\n    this.touches.TWO = three__WEBPACK_IMPORTED_MODULE_0__[\"TOUCH\"].DOLLY_ROTATE;\n  }\n\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanM/YTY1NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERpc3BhdGNoZXIsIE1PVVNFLCBRdWF0ZXJuaW9uLCBTcGhlcmljYWwsIFRPVUNILCBWZWN0b3IyLCBWZWN0b3IzIH0gZnJvbSAndGhyZWUnOyAvLyBUaGlzIHNldCBvZiBjb250cm9scyBwZXJmb3JtcyBvcmJpdGluZywgZG9sbHlpbmcgKHpvb21pbmcpLCBhbmQgcGFubmluZy5cbi8vIFVubGlrZSBUcmFja2JhbGxDb250cm9scywgaXQgbWFpbnRhaW5zIHRoZSBcInVwXCIgZGlyZWN0aW9uIG9iamVjdC51cCAoK1kgYnkgZGVmYXVsdCkuXG4vL1xuLy8gICAgT3JiaXQgLSBsZWZ0IG1vdXNlIC8gdG91Y2g6IG9uZS1maW5nZXIgbW92ZVxuLy8gICAgWm9vbSAtIG1pZGRsZSBtb3VzZSwgb3IgbW91c2V3aGVlbCAvIHRvdWNoOiB0d28tZmluZ2VyIHNwcmVhZCBvciBzcXVpc2hcbi8vICAgIFBhbiAtIHJpZ2h0IG1vdXNlLCBvciBsZWZ0IG1vdXNlICsgY3RybC9tZXRhL3NoaWZ0S2V5LCBvciBhcnJvdyBrZXlzIC8gdG91Y2g6IHR3by1maW5nZXIgbW92ZVxuXG5jb25zdCBfY2hhbmdlRXZlbnQgPSB7XG4gIHR5cGU6ICdjaGFuZ2UnXG59O1xuY29uc3QgX3N0YXJ0RXZlbnQgPSB7XG4gIHR5cGU6ICdzdGFydCdcbn07XG5jb25zdCBfZW5kRXZlbnQgPSB7XG4gIHR5cGU6ICdlbmQnXG59O1xuXG5jbGFzcyBPcmJpdENvbnRyb2xzIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcbiAgY29uc3RydWN0b3Iob2JqZWN0LCBkb21FbGVtZW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoZG9tRWxlbWVudCA9PT0gdW5kZWZpbmVkKSBjb25zb2xlLndhcm4oJ1RIUkVFLk9yYml0Q29udHJvbHM6IFRoZSBzZWNvbmQgcGFyYW1ldGVyIFwiZG9tRWxlbWVudFwiIGlzIG5vdyBtYW5kYXRvcnkuJyk7XG4gICAgaWYgKGRvbUVsZW1lbnQgPT09IGRvY3VtZW50KSBjb25zb2xlLmVycm9yKCdUSFJFRS5PcmJpdENvbnRyb2xzOiBcImRvY3VtZW50XCIgc2hvdWxkIG5vdCBiZSB1c2VkIGFzIHRoZSB0YXJnZXQgXCJkb21FbGVtZW50XCIuIFBsZWFzZSB1c2UgXCJyZW5kZXJlci5kb21FbGVtZW50XCIgaW5zdGVhZC4nKTtcbiAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3VjaEFjdGlvbiA9ICdub25lJzsgLy8gZGlzYWJsZSB0b3VjaCBzY3JvbGxcbiAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGlzIGNvbnRyb2xcblxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7IC8vIFwidGFyZ2V0XCIgc2V0cyB0aGUgbG9jYXRpb24gb2YgZm9jdXMsIHdoZXJlIHRoZSBvYmplY3Qgb3JiaXRzIGFyb3VuZFxuXG4gICAgdGhpcy50YXJnZXQgPSBuZXcgVmVjdG9yMygpOyAvLyBIb3cgZmFyIHlvdSBjYW4gZG9sbHkgaW4gYW5kIG91dCAoIFBlcnNwZWN0aXZlQ2FtZXJhIG9ubHkgKVxuXG4gICAgdGhpcy5taW5EaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5tYXhEaXN0YW5jZSA9IEluZmluaXR5OyAvLyBIb3cgZmFyIHlvdSBjYW4gem9vbSBpbiBhbmQgb3V0ICggT3J0aG9ncmFwaGljQ2FtZXJhIG9ubHkgKVxuXG4gICAgdGhpcy5taW5ab29tID0gMDtcbiAgICB0aGlzLm1heFpvb20gPSBJbmZpbml0eTsgLy8gSG93IGZhciB5b3UgY2FuIG9yYml0IHZlcnRpY2FsbHksIHVwcGVyIGFuZCBsb3dlciBsaW1pdHMuXG4gICAgLy8gUmFuZ2UgaXMgMCB0byBNYXRoLlBJIHJhZGlhbnMuXG5cbiAgICB0aGlzLm1pblBvbGFyQW5nbGUgPSAwOyAvLyByYWRpYW5zXG5cbiAgICB0aGlzLm1heFBvbGFyQW5nbGUgPSBNYXRoLlBJOyAvLyByYWRpYW5zXG4gICAgLy8gSG93IGZhciB5b3UgY2FuIG9yYml0IGhvcml6b250YWxseSwgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAgICAvLyBJZiBzZXQsIHRoZSBpbnRlcnZhbCBbIG1pbiwgbWF4IF0gbXVzdCBiZSBhIHN1Yi1pbnRlcnZhbCBvZiBbIC0gMiBQSSwgMiBQSSBdLCB3aXRoICggbWF4IC0gbWluIDwgMiBQSSApXG5cbiAgICB0aGlzLm1pbkF6aW11dGhBbmdsZSA9IC1JbmZpbml0eTsgLy8gcmFkaWFuc1xuXG4gICAgdGhpcy5tYXhBemltdXRoQW5nbGUgPSBJbmZpbml0eTsgLy8gcmFkaWFuc1xuICAgIC8vIFNldCB0byB0cnVlIHRvIGVuYWJsZSBkYW1waW5nIChpbmVydGlhKVxuICAgIC8vIElmIGRhbXBpbmcgaXMgZW5hYmxlZCwgeW91IG11c3QgY2FsbCBjb250cm9scy51cGRhdGUoKSBpbiB5b3VyIGFuaW1hdGlvbiBsb29wXG5cbiAgICB0aGlzLmVuYWJsZURhbXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmRhbXBpbmdGYWN0b3IgPSAwLjA1OyAvLyBUaGlzIG9wdGlvbiBhY3R1YWxseSBlbmFibGVzIGRvbGx5aW5nIGluIGFuZCBvdXQ7IGxlZnQgYXMgXCJ6b29tXCIgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgIC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHpvb21pbmdcblxuICAgIHRoaXMuZW5hYmxlWm9vbSA9IHRydWU7XG4gICAgdGhpcy56b29tU3BlZWQgPSAxLjA7IC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHJvdGF0aW5nXG5cbiAgICB0aGlzLmVuYWJsZVJvdGF0ZSA9IHRydWU7XG4gICAgdGhpcy5yb3RhdGVTcGVlZCA9IDEuMDsgLy8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgcGFubmluZ1xuXG4gICAgdGhpcy5lbmFibGVQYW4gPSB0cnVlO1xuICAgIHRoaXMucGFuU3BlZWQgPSAxLjA7XG4gICAgdGhpcy5zY3JlZW5TcGFjZVBhbm5pbmcgPSB0cnVlOyAvLyBpZiBmYWxzZSwgcGFuIG9ydGhvZ29uYWwgdG8gd29ybGQtc3BhY2UgZGlyZWN0aW9uIGNhbWVyYS51cFxuXG4gICAgdGhpcy5rZXlQYW5TcGVlZCA9IDcuMDsgLy8gcGl4ZWxzIG1vdmVkIHBlciBhcnJvdyBrZXkgcHVzaFxuICAgIC8vIFNldCB0byB0cnVlIHRvIGF1dG9tYXRpY2FsbHkgcm90YXRlIGFyb3VuZCB0aGUgdGFyZ2V0XG4gICAgLy8gSWYgYXV0by1yb3RhdGUgaXMgZW5hYmxlZCwgeW91IG11c3QgY2FsbCBjb250cm9scy51cGRhdGUoKSBpbiB5b3VyIGFuaW1hdGlvbiBsb29wXG5cbiAgICB0aGlzLmF1dG9Sb3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLmF1dG9Sb3RhdGVTcGVlZCA9IDIuMDsgLy8gMzAgc2Vjb25kcyBwZXIgb3JiaXQgd2hlbiBmcHMgaXMgNjBcbiAgICAvLyBUaGUgZm91ciBhcnJvdyBrZXlzXG5cbiAgICB0aGlzLmtleXMgPSB7XG4gICAgICBMRUZUOiAnQXJyb3dMZWZ0JyxcbiAgICAgIFVQOiAnQXJyb3dVcCcsXG4gICAgICBSSUdIVDogJ0Fycm93UmlnaHQnLFxuICAgICAgQk9UVE9NOiAnQXJyb3dEb3duJ1xuICAgIH07IC8vIE1vdXNlIGJ1dHRvbnNcblxuICAgIHRoaXMubW91c2VCdXR0b25zID0ge1xuICAgICAgTEVGVDogTU9VU0UuUk9UQVRFLFxuICAgICAgTUlERExFOiBNT1VTRS5ET0xMWSxcbiAgICAgIFJJR0hUOiBNT1VTRS5QQU5cbiAgICB9OyAvLyBUb3VjaCBmaW5nZXJzXG5cbiAgICB0aGlzLnRvdWNoZXMgPSB7XG4gICAgICBPTkU6IFRPVUNILlJPVEFURSxcbiAgICAgIFRXTzogVE9VQ0guRE9MTFlfUEFOXG4gICAgfTsgLy8gZm9yIHJlc2V0XG5cbiAgICB0aGlzLnRhcmdldDAgPSB0aGlzLnRhcmdldC5jbG9uZSgpO1xuICAgIHRoaXMucG9zaXRpb24wID0gdGhpcy5vYmplY3QucG9zaXRpb24uY2xvbmUoKTtcbiAgICB0aGlzLnpvb20wID0gdGhpcy5vYmplY3Quem9vbTsgLy8gdGhlIHRhcmdldCBET00gZWxlbWVudCBmb3Iga2V5IGV2ZW50c1xuXG4gICAgdGhpcy5fZG9tRWxlbWVudEtleUV2ZW50cyA9IG51bGw7IC8vXG4gICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICAvL1xuXG4gICAgdGhpcy5nZXRQb2xhckFuZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHNwaGVyaWNhbC5waGk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0QXppbXV0aGFsQW5nbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3BoZXJpY2FsLnRoZXRhO1xuICAgIH07XG5cbiAgICB0aGlzLmxpc3RlblRvS2V5RXZlbnRzID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQpIHtcbiAgICAgIGRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7XG4gICAgICB0aGlzLl9kb21FbGVtZW50S2V5RXZlbnRzID0gZG9tRWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5zYXZlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzY29wZS50YXJnZXQwLmNvcHkoc2NvcGUudGFyZ2V0KTtcbiAgICAgIHNjb3BlLnBvc2l0aW9uMC5jb3B5KHNjb3BlLm9iamVjdC5wb3NpdGlvbik7XG4gICAgICBzY29wZS56b29tMCA9IHNjb3BlLm9iamVjdC56b29tO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2NvcGUudGFyZ2V0LmNvcHkoc2NvcGUudGFyZ2V0MCk7XG4gICAgICBzY29wZS5vYmplY3QucG9zaXRpb24uY29weShzY29wZS5wb3NpdGlvbjApO1xuICAgICAgc2NvcGUub2JqZWN0Lnpvb20gPSBzY29wZS56b29tMDtcbiAgICAgIHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KF9jaGFuZ2VFdmVudCk7XG4gICAgICBzY29wZS51cGRhdGUoKTtcbiAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcbiAgICB9OyAvLyB0aGlzIG1ldGhvZCBpcyBleHBvc2VkLCBidXQgcGVyaGFwcyBpdCB3b3VsZCBiZSBiZXR0ZXIgaWYgd2UgY2FuIG1ha2UgaXQgcHJpdmF0ZS4uLlxuXG5cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBWZWN0b3IzKCk7IC8vIHNvIGNhbWVyYS51cCBpcyB0aGUgb3JiaXQgYXhpc1xuXG4gICAgICBjb25zdCBxdWF0ID0gbmV3IFF1YXRlcm5pb24oKS5zZXRGcm9tVW5pdFZlY3RvcnMob2JqZWN0LnVwLCBuZXcgVmVjdG9yMygwLCAxLCAwKSk7XG4gICAgICBjb25zdCBxdWF0SW52ZXJzZSA9IHF1YXQuY2xvbmUoKS5pbnZlcnQoKTtcbiAgICAgIGNvbnN0IGxhc3RQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKCk7XG4gICAgICBjb25zdCBsYXN0UXVhdGVybmlvbiA9IG5ldyBRdWF0ZXJuaW9uKCk7XG4gICAgICBjb25zdCB0d29QSSA9IDIgKiBNYXRoLlBJO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBzY29wZS5vYmplY3QucG9zaXRpb247XG4gICAgICAgIG9mZnNldC5jb3B5KHBvc2l0aW9uKS5zdWIoc2NvcGUudGFyZ2V0KTsgLy8gcm90YXRlIG9mZnNldCB0byBcInktYXhpcy1pcy11cFwiIHNwYWNlXG5cbiAgICAgICAgb2Zmc2V0LmFwcGx5UXVhdGVybmlvbihxdWF0KTsgLy8gYW5nbGUgZnJvbSB6LWF4aXMgYXJvdW5kIHktYXhpc1xuXG4gICAgICAgIHNwaGVyaWNhbC5zZXRGcm9tVmVjdG9yMyhvZmZzZXQpO1xuXG4gICAgICAgIGlmIChzY29wZS5hdXRvUm90YXRlICYmIHN0YXRlID09PSBTVEFURS5OT05FKSB7XG4gICAgICAgICAgcm90YXRlTGVmdChnZXRBdXRvUm90YXRpb25BbmdsZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY29wZS5lbmFibGVEYW1waW5nKSB7XG4gICAgICAgICAgc3BoZXJpY2FsLnRoZXRhICs9IHNwaGVyaWNhbERlbHRhLnRoZXRhICogc2NvcGUuZGFtcGluZ0ZhY3RvcjtcbiAgICAgICAgICBzcGhlcmljYWwucGhpICs9IHNwaGVyaWNhbERlbHRhLnBoaSAqIHNjb3BlLmRhbXBpbmdGYWN0b3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3BoZXJpY2FsLnRoZXRhICs9IHNwaGVyaWNhbERlbHRhLnRoZXRhO1xuICAgICAgICAgIHNwaGVyaWNhbC5waGkgKz0gc3BoZXJpY2FsRGVsdGEucGhpO1xuICAgICAgICB9IC8vIHJlc3RyaWN0IHRoZXRhIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcblxuXG4gICAgICAgIGxldCBtaW4gPSBzY29wZS5taW5BemltdXRoQW5nbGU7XG4gICAgICAgIGxldCBtYXggPSBzY29wZS5tYXhBemltdXRoQW5nbGU7XG5cbiAgICAgICAgaWYgKGlzRmluaXRlKG1pbikgJiYgaXNGaW5pdGUobWF4KSkge1xuICAgICAgICAgIGlmIChtaW4gPCAtTWF0aC5QSSkgbWluICs9IHR3b1BJO2Vsc2UgaWYgKG1pbiA+IE1hdGguUEkpIG1pbiAtPSB0d29QSTtcbiAgICAgICAgICBpZiAobWF4IDwgLU1hdGguUEkpIG1heCArPSB0d29QSTtlbHNlIGlmIChtYXggPiBNYXRoLlBJKSBtYXggLT0gdHdvUEk7XG5cbiAgICAgICAgICBpZiAobWluIDw9IG1heCkge1xuICAgICAgICAgICAgc3BoZXJpY2FsLnRoZXRhID0gTWF0aC5tYXgobWluLCBNYXRoLm1pbihtYXgsIHNwaGVyaWNhbC50aGV0YSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcGhlcmljYWwudGhldGEgPSBzcGhlcmljYWwudGhldGEgPiAobWluICsgbWF4KSAvIDIgPyBNYXRoLm1heChtaW4sIHNwaGVyaWNhbC50aGV0YSkgOiBNYXRoLm1pbihtYXgsIHNwaGVyaWNhbC50aGV0YSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG5cblxuICAgICAgICBzcGhlcmljYWwucGhpID0gTWF0aC5tYXgoc2NvcGUubWluUG9sYXJBbmdsZSwgTWF0aC5taW4oc2NvcGUubWF4UG9sYXJBbmdsZSwgc3BoZXJpY2FsLnBoaSkpO1xuICAgICAgICBzcGhlcmljYWwubWFrZVNhZmUoKTtcbiAgICAgICAgc3BoZXJpY2FsLnJhZGl1cyAqPSBzY2FsZTsgLy8gcmVzdHJpY3QgcmFkaXVzIHRvIGJlIGJldHdlZW4gZGVzaXJlZCBsaW1pdHNcblxuICAgICAgICBzcGhlcmljYWwucmFkaXVzID0gTWF0aC5tYXgoc2NvcGUubWluRGlzdGFuY2UsIE1hdGgubWluKHNjb3BlLm1heERpc3RhbmNlLCBzcGhlcmljYWwucmFkaXVzKSk7IC8vIG1vdmUgdGFyZ2V0IHRvIHBhbm5lZCBsb2NhdGlvblxuXG4gICAgICAgIGlmIChzY29wZS5lbmFibGVEYW1waW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgc2NvcGUudGFyZ2V0LmFkZFNjYWxlZFZlY3RvcihwYW5PZmZzZXQsIHNjb3BlLmRhbXBpbmdGYWN0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNjb3BlLnRhcmdldC5hZGQocGFuT2Zmc2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9mZnNldC5zZXRGcm9tU3BoZXJpY2FsKHNwaGVyaWNhbCk7IC8vIHJvdGF0ZSBvZmZzZXQgYmFjayB0byBcImNhbWVyYS11cC12ZWN0b3ItaXMtdXBcIiBzcGFjZVxuXG4gICAgICAgIG9mZnNldC5hcHBseVF1YXRlcm5pb24ocXVhdEludmVyc2UpO1xuICAgICAgICBwb3NpdGlvbi5jb3B5KHNjb3BlLnRhcmdldCkuYWRkKG9mZnNldCk7XG4gICAgICAgIHNjb3BlLm9iamVjdC5sb29rQXQoc2NvcGUudGFyZ2V0KTtcblxuICAgICAgICBpZiAoc2NvcGUuZW5hYmxlRGFtcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnRoZXRhICo9IDEgLSBzY29wZS5kYW1waW5nRmFjdG9yO1xuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnBoaSAqPSAxIC0gc2NvcGUuZGFtcGluZ0ZhY3RvcjtcbiAgICAgICAgICBwYW5PZmZzZXQubXVsdGlwbHlTY2FsYXIoMSAtIHNjb3BlLmRhbXBpbmdGYWN0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNwaGVyaWNhbERlbHRhLnNldCgwLCAwLCAwKTtcbiAgICAgICAgICBwYW5PZmZzZXQuc2V0KDAsIDAsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NhbGUgPSAxOyAvLyB1cGRhdGUgY29uZGl0aW9uIGlzOlxuICAgICAgICAvLyBtaW4oY2FtZXJhIGRpc3BsYWNlbWVudCwgY2FtZXJhIHJvdGF0aW9uIGluIHJhZGlhbnMpXjIgPiBFUFNcbiAgICAgICAgLy8gdXNpbmcgc21hbGwtYW5nbGUgYXBwcm94aW1hdGlvbiBjb3MoeC8yKSA9IDEgLSB4XjIgLyA4XG5cbiAgICAgICAgaWYgKHpvb21DaGFuZ2VkIHx8IGxhc3RQb3NpdGlvbi5kaXN0YW5jZVRvU3F1YXJlZChzY29wZS5vYmplY3QucG9zaXRpb24pID4gRVBTIHx8IDggKiAoMSAtIGxhc3RRdWF0ZXJuaW9uLmRvdChzY29wZS5vYmplY3QucXVhdGVybmlvbikpID4gRVBTKSB7XG4gICAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudChfY2hhbmdlRXZlbnQpO1xuICAgICAgICAgIGxhc3RQb3NpdGlvbi5jb3B5KHNjb3BlLm9iamVjdC5wb3NpdGlvbik7XG4gICAgICAgICAgbGFzdFF1YXRlcm5pb24uY29weShzY29wZS5vYmplY3QucXVhdGVybmlvbik7XG4gICAgICAgICAgem9vbUNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG4gICAgfSgpO1xuXG4gICAgdGhpcy5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2NvcGUuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIG9uQ29udGV4dE1lbnUpO1xuICAgICAgc2NvcGUuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIG9uUG9pbnRlckRvd24pO1xuICAgICAgc2NvcGUuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyY2FuY2VsJywgb25Qb2ludGVyQ2FuY2VsKTtcbiAgICAgIHNjb3BlLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBvbk1vdXNlV2hlZWwpO1xuICAgICAgc2NvcGUuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uUG9pbnRlck1vdmUpO1xuICAgICAgc2NvcGUuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblBvaW50ZXJVcCk7XG5cbiAgICAgIGlmIChzY29wZS5fZG9tRWxlbWVudEtleUV2ZW50cyAhPT0gbnVsbCkge1xuICAgICAgICBzY29wZS5fZG9tRWxlbWVudEtleUV2ZW50cy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcbiAgICAgIH0gLy9zY29wZS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdkaXNwb3NlJyB9ICk7IC8vIHNob3VsZCB0aGlzIGJlIGFkZGVkIGhlcmU/XG5cbiAgICB9OyAvL1xuICAgIC8vIGludGVybmFsc1xuICAgIC8vXG5cblxuICAgIGNvbnN0IHNjb3BlID0gdGhpcztcbiAgICBjb25zdCBTVEFURSA9IHtcbiAgICAgIE5PTkU6IC0xLFxuICAgICAgUk9UQVRFOiAwLFxuICAgICAgRE9MTFk6IDEsXG4gICAgICBQQU46IDIsXG4gICAgICBUT1VDSF9ST1RBVEU6IDMsXG4gICAgICBUT1VDSF9QQU46IDQsXG4gICAgICBUT1VDSF9ET0xMWV9QQU46IDUsXG4gICAgICBUT1VDSF9ET0xMWV9ST1RBVEU6IDZcbiAgICB9O1xuICAgIGxldCBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgY29uc3QgRVBTID0gMC4wMDAwMDE7IC8vIGN1cnJlbnQgcG9zaXRpb24gaW4gc3BoZXJpY2FsIGNvb3JkaW5hdGVzXG5cbiAgICBjb25zdCBzcGhlcmljYWwgPSBuZXcgU3BoZXJpY2FsKCk7XG4gICAgY29uc3Qgc3BoZXJpY2FsRGVsdGEgPSBuZXcgU3BoZXJpY2FsKCk7XG4gICAgbGV0IHNjYWxlID0gMTtcbiAgICBjb25zdCBwYW5PZmZzZXQgPSBuZXcgVmVjdG9yMygpO1xuICAgIGxldCB6b29tQ2hhbmdlZCA9IGZhbHNlO1xuICAgIGNvbnN0IHJvdGF0ZVN0YXJ0ID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCByb3RhdGVFbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHJvdGF0ZURlbHRhID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBwYW5TdGFydCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgcGFuRW5kID0gbmV3IFZlY3RvcjIoKTtcbiAgICBjb25zdCBwYW5EZWx0YSA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgZG9sbHlTdGFydCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgY29uc3QgZG9sbHlFbmQgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IGRvbGx5RGVsdGEgPSBuZXcgVmVjdG9yMigpO1xuICAgIGNvbnN0IHBvaW50ZXJzID0gW107XG4gICAgY29uc3QgcG9pbnRlclBvc2l0aW9ucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKSB7XG4gICAgICByZXR1cm4gMiAqIE1hdGguUEkgLyA2MCAvIDYwICogc2NvcGUuYXV0b1JvdGF0ZVNwZWVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFpvb21TY2FsZSgpIHtcbiAgICAgIHJldHVybiBNYXRoLnBvdygwLjk1LCBzY29wZS56b29tU3BlZWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZUxlZnQoYW5nbGUpIHtcbiAgICAgIHNwaGVyaWNhbERlbHRhLnRoZXRhIC09IGFuZ2xlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZVVwKGFuZ2xlKSB7XG4gICAgICBzcGhlcmljYWxEZWx0YS5waGkgLT0gYW5nbGU7XG4gICAgfVxuXG4gICAgY29uc3QgcGFuTGVmdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHYgPSBuZXcgVmVjdG9yMygpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHBhbkxlZnQoZGlzdGFuY2UsIG9iamVjdE1hdHJpeCkge1xuICAgICAgICB2LnNldEZyb21NYXRyaXhDb2x1bW4ob2JqZWN0TWF0cml4LCAwKTsgLy8gZ2V0IFggY29sdW1uIG9mIG9iamVjdE1hdHJpeFxuXG4gICAgICAgIHYubXVsdGlwbHlTY2FsYXIoLWRpc3RhbmNlKTtcbiAgICAgICAgcGFuT2Zmc2V0LmFkZCh2KTtcbiAgICAgIH07XG4gICAgfSgpO1xuXG4gICAgY29uc3QgcGFuVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB2ID0gbmV3IFZlY3RvcjMoKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBwYW5VcChkaXN0YW5jZSwgb2JqZWN0TWF0cml4KSB7XG4gICAgICAgIGlmIChzY29wZS5zY3JlZW5TcGFjZVBhbm5pbmcgPT09IHRydWUpIHtcbiAgICAgICAgICB2LnNldEZyb21NYXRyaXhDb2x1bW4ob2JqZWN0TWF0cml4LCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2LnNldEZyb21NYXRyaXhDb2x1bW4ob2JqZWN0TWF0cml4LCAwKTtcbiAgICAgICAgICB2LmNyb3NzVmVjdG9ycyhzY29wZS5vYmplY3QudXAsIHYpO1xuICAgICAgICB9XG5cbiAgICAgICAgdi5tdWx0aXBseVNjYWxhcihkaXN0YW5jZSk7XG4gICAgICAgIHBhbk9mZnNldC5hZGQodik7XG4gICAgICB9O1xuICAgIH0oKTsgLy8gZGVsdGFYIGFuZCBkZWx0YVkgYXJlIGluIHBpeGVsczsgcmlnaHQgYW5kIGRvd24gYXJlIHBvc2l0aXZlXG5cblxuICAgIGNvbnN0IHBhbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBWZWN0b3IzKCk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gcGFuKGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBzY29wZS5kb21FbGVtZW50O1xuXG4gICAgICAgIGlmIChzY29wZS5vYmplY3QuaXNQZXJzcGVjdGl2ZUNhbWVyYSkge1xuICAgICAgICAgIC8vIHBlcnNwZWN0aXZlXG4gICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBzY29wZS5vYmplY3QucG9zaXRpb247XG4gICAgICAgICAgb2Zmc2V0LmNvcHkocG9zaXRpb24pLnN1YihzY29wZS50YXJnZXQpO1xuICAgICAgICAgIGxldCB0YXJnZXREaXN0YW5jZSA9IG9mZnNldC5sZW5ndGgoKTsgLy8gaGFsZiBvZiB0aGUgZm92IGlzIGNlbnRlciB0byB0b3Agb2Ygc2NyZWVuXG5cbiAgICAgICAgICB0YXJnZXREaXN0YW5jZSAqPSBNYXRoLnRhbihzY29wZS5vYmplY3QuZm92IC8gMiAqIE1hdGguUEkgLyAxODAuMCk7IC8vIHdlIHVzZSBvbmx5IGNsaWVudEhlaWdodCBoZXJlIHNvIGFzcGVjdCByYXRpbyBkb2VzIG5vdCBkaXN0b3J0IHNwZWVkXG5cbiAgICAgICAgICBwYW5MZWZ0KDIgKiBkZWx0YVggKiB0YXJnZXREaXN0YW5jZSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCBzY29wZS5vYmplY3QubWF0cml4KTtcbiAgICAgICAgICBwYW5VcCgyICogZGVsdGFZICogdGFyZ2V0RGlzdGFuY2UgLyBlbGVtZW50LmNsaWVudEhlaWdodCwgc2NvcGUub2JqZWN0Lm1hdHJpeCk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2NvcGUub2JqZWN0LmlzT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgICAgLy8gb3J0aG9ncmFwaGljXG4gICAgICAgICAgcGFuTGVmdChkZWx0YVggKiAoc2NvcGUub2JqZWN0LnJpZ2h0IC0gc2NvcGUub2JqZWN0LmxlZnQpIC8gc2NvcGUub2JqZWN0Lnpvb20gLyBlbGVtZW50LmNsaWVudFdpZHRoLCBzY29wZS5vYmplY3QubWF0cml4KTtcbiAgICAgICAgICBwYW5VcChkZWx0YVkgKiAoc2NvcGUub2JqZWN0LnRvcCAtIHNjb3BlLm9iamVjdC5ib3R0b20pIC8gc2NvcGUub2JqZWN0Lnpvb20gLyBlbGVtZW50LmNsaWVudEhlaWdodCwgc2NvcGUub2JqZWN0Lm1hdHJpeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY2FtZXJhIG5laXRoZXIgb3J0aG9ncmFwaGljIG5vciBwZXJzcGVjdGl2ZVxuICAgICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9scy5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gcGFuIGRpc2FibGVkLicpO1xuICAgICAgICAgIHNjb3BlLmVuYWJsZVBhbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0oKTtcblxuICAgIGZ1bmN0aW9uIGRvbGx5T3V0KGRvbGx5U2NhbGUpIHtcbiAgICAgIGlmIChzY29wZS5vYmplY3QuaXNQZXJzcGVjdGl2ZUNhbWVyYSkge1xuICAgICAgICBzY2FsZSAvPSBkb2xseVNjYWxlO1xuICAgICAgfSBlbHNlIGlmIChzY29wZS5vYmplY3QuaXNPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgc2NvcGUub2JqZWN0Lnpvb20gPSBNYXRoLm1heChzY29wZS5taW5ab29tLCBNYXRoLm1pbihzY29wZS5tYXhab29tLCBzY29wZS5vYmplY3Quem9vbSAqIGRvbGx5U2NhbGUpKTtcbiAgICAgICAgc2NvcGUub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgICAgem9vbUNoYW5nZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBPcmJpdENvbnRyb2xzLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBkb2xseS96b29tIGRpc2FibGVkLicpO1xuICAgICAgICBzY29wZS5lbmFibGVab29tID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9sbHlJbihkb2xseVNjYWxlKSB7XG4gICAgICBpZiAoc2NvcGUub2JqZWN0LmlzUGVyc3BlY3RpdmVDYW1lcmEpIHtcbiAgICAgICAgc2NhbGUgKj0gZG9sbHlTY2FsZTtcbiAgICAgIH0gZWxzZSBpZiAoc2NvcGUub2JqZWN0LmlzT3J0aG9ncmFwaGljQ2FtZXJhKSB7XG4gICAgICAgIHNjb3BlLm9iamVjdC56b29tID0gTWF0aC5tYXgoc2NvcGUubWluWm9vbSwgTWF0aC5taW4oc2NvcGUubWF4Wm9vbSwgc2NvcGUub2JqZWN0Lnpvb20gLyBkb2xseVNjYWxlKSk7XG4gICAgICAgIHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgIHpvb21DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogT3JiaXRDb250cm9scy5qcyBlbmNvdW50ZXJlZCBhbiB1bmtub3duIGNhbWVyYSB0eXBlIC0gZG9sbHkvem9vbSBkaXNhYmxlZC4nKTtcbiAgICAgICAgc2NvcGUuZW5hYmxlWm9vbSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gLy9cbiAgICAvLyBldmVudCBjYWxsYmFja3MgLSB1cGRhdGUgdGhlIG9iamVjdCBzdGF0ZVxuICAgIC8vXG5cblxuICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlRG93blJvdGF0ZShldmVudCkge1xuICAgICAgcm90YXRlU3RhcnQuc2V0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlRG93bkRvbGx5KGV2ZW50KSB7XG4gICAgICBkb2xseVN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd25QYW4oZXZlbnQpIHtcbiAgICAgIHBhblN0YXJ0LnNldChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmVSb3RhdGUoZXZlbnQpIHtcbiAgICAgIHJvdGF0ZUVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICByb3RhdGVEZWx0YS5zdWJWZWN0b3JzKHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQpLm11bHRpcGx5U2NhbGFyKHNjb3BlLnJvdGF0ZVNwZWVkKTtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBzY29wZS5kb21FbGVtZW50O1xuICAgICAgcm90YXRlTGVmdCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnggLyBlbGVtZW50LmNsaWVudEhlaWdodCk7IC8vIHllcywgaGVpZ2h0XG5cbiAgICAgIHJvdGF0ZVVwKDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICAgIHJvdGF0ZVN0YXJ0LmNvcHkocm90YXRlRW5kKTtcbiAgICAgIHNjb3BlLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlTW92ZURvbGx5KGV2ZW50KSB7XG4gICAgICBkb2xseUVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICBkb2xseURlbHRhLnN1YlZlY3RvcnMoZG9sbHlFbmQsIGRvbGx5U3RhcnQpO1xuXG4gICAgICBpZiAoZG9sbHlEZWx0YS55ID4gMCkge1xuICAgICAgICBkb2xseU91dChnZXRab29tU2NhbGUoKSk7XG4gICAgICB9IGVsc2UgaWYgKGRvbGx5RGVsdGEueSA8IDApIHtcbiAgICAgICAgZG9sbHlJbihnZXRab29tU2NhbGUoKSk7XG4gICAgICB9XG5cbiAgICAgIGRvbGx5U3RhcnQuY29weShkb2xseUVuZCk7XG4gICAgICBzY29wZS51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmVQYW4oZXZlbnQpIHtcbiAgICAgIHBhbkVuZC5zZXQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICBwYW5EZWx0YS5zdWJWZWN0b3JzKHBhbkVuZCwgcGFuU3RhcnQpLm11bHRpcGx5U2NhbGFyKHNjb3BlLnBhblNwZWVkKTtcbiAgICAgIHBhbihwYW5EZWx0YS54LCBwYW5EZWx0YS55KTtcbiAgICAgIHBhblN0YXJ0LmNvcHkocGFuRW5kKTtcbiAgICAgIHNjb3BlLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlVXAoKVxuICAgIC8qZXZlbnQqL1xuICAgIHsvLyBuby1vcFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlV2hlZWwoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5kZWx0YVkgPCAwKSB7XG4gICAgICAgIGRvbGx5SW4oZ2V0Wm9vbVNjYWxlKCkpO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5kZWx0YVkgPiAwKSB7XG4gICAgICAgIGRvbGx5T3V0KGdldFpvb21TY2FsZSgpKTtcbiAgICAgIH1cblxuICAgICAgc2NvcGUudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgbGV0IG5lZWRzVXBkYXRlID0gZmFsc2U7XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICBjYXNlIHNjb3BlLmtleXMuVVA6XG4gICAgICAgICAgcGFuKDAsIHNjb3BlLmtleVBhblNwZWVkKTtcbiAgICAgICAgICBuZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBzY29wZS5rZXlzLkJPVFRPTTpcbiAgICAgICAgICBwYW4oMCwgLXNjb3BlLmtleVBhblNwZWVkKTtcbiAgICAgICAgICBuZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBzY29wZS5rZXlzLkxFRlQ6XG4gICAgICAgICAgcGFuKHNjb3BlLmtleVBhblNwZWVkLCAwKTtcbiAgICAgICAgICBuZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBzY29wZS5rZXlzLlJJR0hUOlxuICAgICAgICAgIHBhbigtc2NvcGUua2V5UGFuU3BlZWQsIDApO1xuICAgICAgICAgIG5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRzVXBkYXRlKSB7XG4gICAgICAgIC8vIHByZXZlbnQgdGhlIGJyb3dzZXIgZnJvbSBzY3JvbGxpbmcgb24gY3Vyc29yIGtleXNcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2NvcGUudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydFJvdGF0ZSgpIHtcbiAgICAgIGlmIChwb2ludGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcm90YXRlU3RhcnQuc2V0KHBvaW50ZXJzWzBdLnBhZ2VYLCBwb2ludGVyc1swXS5wYWdlWSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB4ID0gMC41ICogKHBvaW50ZXJzWzBdLnBhZ2VYICsgcG9pbnRlcnNbMV0ucGFnZVgpO1xuICAgICAgICBjb25zdCB5ID0gMC41ICogKHBvaW50ZXJzWzBdLnBhZ2VZICsgcG9pbnRlcnNbMV0ucGFnZVkpO1xuICAgICAgICByb3RhdGVTdGFydC5zZXQoeCwgeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydFBhbigpIHtcbiAgICAgIGlmIChwb2ludGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcGFuU3RhcnQuc2V0KHBvaW50ZXJzWzBdLnBhZ2VYLCBwb2ludGVyc1swXS5wYWdlWSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB4ID0gMC41ICogKHBvaW50ZXJzWzBdLnBhZ2VYICsgcG9pbnRlcnNbMV0ucGFnZVgpO1xuICAgICAgICBjb25zdCB5ID0gMC41ICogKHBvaW50ZXJzWzBdLnBhZ2VZICsgcG9pbnRlcnNbMV0ucGFnZVkpO1xuICAgICAgICBwYW5TdGFydC5zZXQoeCwgeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydERvbGx5KCkge1xuICAgICAgY29uc3QgZHggPSBwb2ludGVyc1swXS5wYWdlWCAtIHBvaW50ZXJzWzFdLnBhZ2VYO1xuICAgICAgY29uc3QgZHkgPSBwb2ludGVyc1swXS5wYWdlWSAtIHBvaW50ZXJzWzFdLnBhZ2VZO1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgZG9sbHlTdGFydC5zZXQoMCwgZGlzdGFuY2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVRvdWNoU3RhcnREb2xseVBhbigpIHtcbiAgICAgIGlmIChzY29wZS5lbmFibGVab29tKSBoYW5kbGVUb3VjaFN0YXJ0RG9sbHkoKTtcbiAgICAgIGlmIChzY29wZS5lbmFibGVQYW4pIGhhbmRsZVRvdWNoU3RhcnRQYW4oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUb3VjaFN0YXJ0RG9sbHlSb3RhdGUoKSB7XG4gICAgICBpZiAoc2NvcGUuZW5hYmxlWm9vbSkgaGFuZGxlVG91Y2hTdGFydERvbGx5KCk7XG4gICAgICBpZiAoc2NvcGUuZW5hYmxlUm90YXRlKSBoYW5kbGVUb3VjaFN0YXJ0Um90YXRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hNb3ZlUm90YXRlKGV2ZW50KSB7XG4gICAgICBpZiAocG9pbnRlcnMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgcm90YXRlRW5kLnNldChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBnZXRTZWNvbmRQb2ludGVyUG9zaXRpb24oZXZlbnQpO1xuICAgICAgICBjb25zdCB4ID0gMC41ICogKGV2ZW50LnBhZ2VYICsgcG9zaXRpb24ueCk7XG4gICAgICAgIGNvbnN0IHkgPSAwLjUgKiAoZXZlbnQucGFnZVkgKyBwb3NpdGlvbi55KTtcbiAgICAgICAgcm90YXRlRW5kLnNldCh4LCB5KTtcbiAgICAgIH1cblxuICAgICAgcm90YXRlRGVsdGEuc3ViVmVjdG9ycyhyb3RhdGVFbmQsIHJvdGF0ZVN0YXJ0KS5tdWx0aXBseVNjYWxhcihzY29wZS5yb3RhdGVTcGVlZCk7XG4gICAgICBjb25zdCBlbGVtZW50ID0gc2NvcGUuZG9tRWxlbWVudDtcbiAgICAgIHJvdGF0ZUxlZnQoMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS54IC8gZWxlbWVudC5jbGllbnRIZWlnaHQpOyAvLyB5ZXMsIGhlaWdodFxuXG4gICAgICByb3RhdGVVcCgyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnkgLyBlbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICByb3RhdGVTdGFydC5jb3B5KHJvdGF0ZUVuZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hNb3ZlUGFuKGV2ZW50KSB7XG4gICAgICBpZiAocG9pbnRlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHBhbkVuZC5zZXQoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0U2Vjb25kUG9pbnRlclBvc2l0aW9uKGV2ZW50KTtcbiAgICAgICAgY29uc3QgeCA9IDAuNSAqIChldmVudC5wYWdlWCArIHBvc2l0aW9uLngpO1xuICAgICAgICBjb25zdCB5ID0gMC41ICogKGV2ZW50LnBhZ2VZICsgcG9zaXRpb24ueSk7XG4gICAgICAgIHBhbkVuZC5zZXQoeCwgeSk7XG4gICAgICB9XG5cbiAgICAgIHBhbkRlbHRhLnN1YlZlY3RvcnMocGFuRW5kLCBwYW5TdGFydCkubXVsdGlwbHlTY2FsYXIoc2NvcGUucGFuU3BlZWQpO1xuICAgICAgcGFuKHBhbkRlbHRhLngsIHBhbkRlbHRhLnkpO1xuICAgICAgcGFuU3RhcnQuY29weShwYW5FbmQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVRvdWNoTW92ZURvbGx5KGV2ZW50KSB7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGdldFNlY29uZFBvaW50ZXJQb3NpdGlvbihldmVudCk7XG4gICAgICBjb25zdCBkeCA9IGV2ZW50LnBhZ2VYIC0gcG9zaXRpb24ueDtcbiAgICAgIGNvbnN0IGR5ID0gZXZlbnQucGFnZVkgLSBwb3NpdGlvbi55O1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgZG9sbHlFbmQuc2V0KDAsIGRpc3RhbmNlKTtcbiAgICAgIGRvbGx5RGVsdGEuc2V0KDAsIE1hdGgucG93KGRvbGx5RW5kLnkgLyBkb2xseVN0YXJ0LnksIHNjb3BlLnpvb21TcGVlZCkpO1xuICAgICAgZG9sbHlPdXQoZG9sbHlEZWx0YS55KTtcbiAgICAgIGRvbGx5U3RhcnQuY29weShkb2xseUVuZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hNb3ZlRG9sbHlQYW4oZXZlbnQpIHtcbiAgICAgIGlmIChzY29wZS5lbmFibGVab29tKSBoYW5kbGVUb3VjaE1vdmVEb2xseShldmVudCk7XG4gICAgICBpZiAoc2NvcGUuZW5hYmxlUGFuKSBoYW5kbGVUb3VjaE1vdmVQYW4oZXZlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVRvdWNoTW92ZURvbGx5Um90YXRlKGV2ZW50KSB7XG4gICAgICBpZiAoc2NvcGUuZW5hYmxlWm9vbSkgaGFuZGxlVG91Y2hNb3ZlRG9sbHkoZXZlbnQpO1xuICAgICAgaWYgKHNjb3BlLmVuYWJsZVJvdGF0ZSkgaGFuZGxlVG91Y2hNb3ZlUm90YXRlKGV2ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUb3VjaEVuZCgpXG4gICAgLypldmVudCovXG4gICAge30gLy8gbm8tb3BcbiAgICAvL1xuICAgIC8vIGV2ZW50IGhhbmRsZXJzIC0gRlNNOiBsaXN0ZW4gZm9yIGV2ZW50cyBhbmQgcmVzZXQgc3RhdGVcbiAgICAvL1xuXG5cbiAgICBmdW5jdGlvbiBvblBvaW50ZXJEb3duKGV2ZW50KSB7XG4gICAgICBpZiAoc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaWYgKHBvaW50ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzY29wZS5kb21FbGVtZW50LnNldFBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgIHNjb3BlLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvblBvaW50ZXJNb3ZlKTtcbiAgICAgICAgc2NvcGUuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblBvaW50ZXJVcCk7XG4gICAgICB9IC8vXG5cblxuICAgICAgYWRkUG9pbnRlcihldmVudCk7XG5cbiAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gJ3RvdWNoJykge1xuICAgICAgICBvblRvdWNoU3RhcnQoZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25Nb3VzZURvd24oZXZlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUG9pbnRlck1vdmUoZXZlbnQpIHtcbiAgICAgIGlmIChzY29wZS5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICBpZiAoZXZlbnQucG9pbnRlclR5cGUgPT09ICd0b3VjaCcpIHtcbiAgICAgICAgb25Ub3VjaE1vdmUoZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25Nb3VzZU1vdmUoZXZlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUG9pbnRlclVwKGV2ZW50KSB7XG4gICAgICBpZiAoc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgaWYgKGV2ZW50LnBvaW50ZXJUeXBlID09PSAndG91Y2gnKSB7XG4gICAgICAgIG9uVG91Y2hFbmQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uTW91c2VVcChldmVudCk7XG4gICAgICB9XG5cbiAgICAgIHJlbW92ZVBvaW50ZXIoZXZlbnQpOyAvL1xuXG4gICAgICBpZiAocG9pbnRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNjb3BlLmRvbUVsZW1lbnQucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgIHNjb3BlLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvblBvaW50ZXJNb3ZlKTtcbiAgICAgICAgc2NvcGUuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblBvaW50ZXJVcCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Qb2ludGVyQ2FuY2VsKGV2ZW50KSB7XG4gICAgICByZW1vdmVQb2ludGVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgbGV0IG1vdXNlQWN0aW9uO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50LmJ1dHRvbikge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgbW91c2VBY3Rpb24gPSBzY29wZS5tb3VzZUJ1dHRvbnMuTEVGVDtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgbW91c2VBY3Rpb24gPSBzY29wZS5tb3VzZUJ1dHRvbnMuTUlERExFO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBtb3VzZUFjdGlvbiA9IHNjb3BlLm1vdXNlQnV0dG9ucy5SSUdIVDtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1vdXNlQWN0aW9uID0gLTE7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAobW91c2VBY3Rpb24pIHtcbiAgICAgICAgY2FzZSBNT1VTRS5ET0xMWTpcbiAgICAgICAgICBpZiAoc2NvcGUuZW5hYmxlWm9vbSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBoYW5kbGVNb3VzZURvd25Eb2xseShldmVudCk7XG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5ET0xMWTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIE1PVVNFLlJPVEFURTpcbiAgICAgICAgICBpZiAoZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgICAgaGFuZGxlTW91c2VEb3duUGFuKGV2ZW50KTtcbiAgICAgICAgICAgIHN0YXRlID0gU1RBVEUuUEFOO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgICAgaGFuZGxlTW91c2VEb3duUm90YXRlKGV2ZW50KTtcbiAgICAgICAgICAgIHN0YXRlID0gU1RBVEUuUk9UQVRFO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgTU9VU0UuUEFOOlxuICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5IHx8IGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5lbmFibGVSb3RhdGUgPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgICBoYW5kbGVNb3VzZURvd25Sb3RhdGUoZXZlbnQpO1xuICAgICAgICAgICAgc3RhdGUgPSBTVEFURS5ST1RBVEU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgICBoYW5kbGVNb3VzZURvd25QYW4oZXZlbnQpO1xuICAgICAgICAgICAgc3RhdGUgPSBTVEFURS5QQU47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSAhPT0gU1RBVEUuTk9ORSkge1xuICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KF9zdGFydEV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlTW92ZShldmVudCkge1xuICAgICAgaWYgKHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgY2FzZSBTVEFURS5ST1RBVEU6XG4gICAgICAgICAgaWYgKHNjb3BlLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBoYW5kbGVNb3VzZU1vdmVSb3RhdGUoZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgU1RBVEUuRE9MTFk6XG4gICAgICAgICAgaWYgKHNjb3BlLmVuYWJsZVpvb20gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaGFuZGxlTW91c2VNb3ZlRG9sbHkoZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgU1RBVEUuUEFOOlxuICAgICAgICAgIGlmIChzY29wZS5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaGFuZGxlTW91c2VNb3ZlUGFuKGV2ZW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAgIGhhbmRsZU1vdXNlVXAoZXZlbnQpO1xuICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudChfZW5kRXZlbnQpO1xuICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VXaGVlbChldmVudCkge1xuICAgICAgaWYgKHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlIHx8IHNjb3BlLmVuYWJsZVpvb20gPT09IGZhbHNlIHx8IHN0YXRlICE9PSBTVEFURS5OT05FICYmIHN0YXRlICE9PSBTVEFURS5ST1RBVEUpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KF9zdGFydEV2ZW50KTtcbiAgICAgIGhhbmRsZU1vdXNlV2hlZWwoZXZlbnQpO1xuICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudChfZW5kRXZlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5RG93bihldmVudCkge1xuICAgICAgaWYgKHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlIHx8IHNjb3BlLmVuYWJsZVBhbiA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgIGhhbmRsZUtleURvd24oZXZlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgdHJhY2tQb2ludGVyKGV2ZW50KTtcblxuICAgICAgc3dpdGNoIChwb2ludGVycy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHN3aXRjaCAoc2NvcGUudG91Y2hlcy5PTkUpIHtcbiAgICAgICAgICAgIGNhc2UgVE9VQ0guUk9UQVRFOlxuICAgICAgICAgICAgICBpZiAoc2NvcGUuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgICAgICBoYW5kbGVUb3VjaFN0YXJ0Um90YXRlKCk7XG4gICAgICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfUk9UQVRFO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBUT1VDSC5QQU46XG4gICAgICAgICAgICAgIGlmIChzY29wZS5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgICAgIGhhbmRsZVRvdWNoU3RhcnRQYW4oKTtcbiAgICAgICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9QQU47XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHN3aXRjaCAoc2NvcGUudG91Y2hlcy5UV08pIHtcbiAgICAgICAgICAgIGNhc2UgVE9VQ0guRE9MTFlfUEFOOlxuICAgICAgICAgICAgICBpZiAoc2NvcGUuZW5hYmxlWm9vbSA9PT0gZmFsc2UgJiYgc2NvcGUuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgICAgICBoYW5kbGVUb3VjaFN0YXJ0RG9sbHlQYW4oKTtcbiAgICAgICAgICAgICAgc3RhdGUgPSBTVEFURS5UT1VDSF9ET0xMWV9QQU47XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFRPVUNILkRPTExZX1JPVEFURTpcbiAgICAgICAgICAgICAgaWYgKHNjb3BlLmVuYWJsZVpvb20gPT09IGZhbHNlICYmIHNjb3BlLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICAgICAgaGFuZGxlVG91Y2hTdGFydERvbGx5Um90YXRlKCk7XG4gICAgICAgICAgICAgIHN0YXRlID0gU1RBVEUuVE9VQ0hfRE9MTFlfUk9UQVRFO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgc3RhdGUgPSBTVEFURS5OT05FO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgIT09IFNUQVRFLk5PTkUpIHtcbiAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudChfc3RhcnRFdmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Ub3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgIHRyYWNrUG9pbnRlcihldmVudCk7XG5cbiAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgY2FzZSBTVEFURS5UT1VDSF9ST1RBVEU6XG4gICAgICAgICAgaWYgKHNjb3BlLmVuYWJsZVJvdGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBoYW5kbGVUb3VjaE1vdmVSb3RhdGUoZXZlbnQpO1xuICAgICAgICAgIHNjb3BlLnVwZGF0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgU1RBVEUuVE9VQ0hfUEFOOlxuICAgICAgICAgIGlmIChzY29wZS5lbmFibGVQYW4gPT09IGZhbHNlKSByZXR1cm47XG4gICAgICAgICAgaGFuZGxlVG91Y2hNb3ZlUGFuKGV2ZW50KTtcbiAgICAgICAgICBzY29wZS51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFNUQVRFLlRPVUNIX0RPTExZX1BBTjpcbiAgICAgICAgICBpZiAoc2NvcGUuZW5hYmxlWm9vbSA9PT0gZmFsc2UgJiYgc2NvcGUuZW5hYmxlUGFuID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgIGhhbmRsZVRvdWNoTW92ZURvbGx5UGFuKGV2ZW50KTtcbiAgICAgICAgICBzY29wZS51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFNUQVRFLlRPVUNIX0RPTExZX1JPVEFURTpcbiAgICAgICAgICBpZiAoc2NvcGUuZW5hYmxlWm9vbSA9PT0gZmFsc2UgJiYgc2NvcGUuZW5hYmxlUm90YXRlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICAgIGhhbmRsZVRvdWNoTW92ZURvbGx5Um90YXRlKGV2ZW50KTtcbiAgICAgICAgICBzY29wZS51cGRhdGUoKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHN0YXRlID0gU1RBVEUuTk9ORTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICBoYW5kbGVUb3VjaEVuZChldmVudCk7XG4gICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KF9lbmRFdmVudCk7XG4gICAgICBzdGF0ZSA9IFNUQVRFLk5PTkU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250ZXh0TWVudShldmVudCkge1xuICAgICAgaWYgKHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFBvaW50ZXIoZXZlbnQpIHtcbiAgICAgIHBvaW50ZXJzLnB1c2goZXZlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVBvaW50ZXIoZXZlbnQpIHtcbiAgICAgIGRlbGV0ZSBwb2ludGVyUG9zaXRpb25zW2V2ZW50LnBvaW50ZXJJZF07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHBvaW50ZXJzW2ldLnBvaW50ZXJJZCA9PSBldmVudC5wb2ludGVySWQpIHtcbiAgICAgICAgICBwb2ludGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhY2tQb2ludGVyKGV2ZW50KSB7XG4gICAgICBsZXQgcG9zaXRpb24gPSBwb2ludGVyUG9zaXRpb25zW2V2ZW50LnBvaW50ZXJJZF07XG5cbiAgICAgIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvc2l0aW9uID0gbmV3IFZlY3RvcjIoKTtcbiAgICAgICAgcG9pbnRlclBvc2l0aW9uc1tldmVudC5wb2ludGVySWRdID0gcG9zaXRpb247XG4gICAgICB9XG5cbiAgICAgIHBvc2l0aW9uLnNldChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNlY29uZFBvaW50ZXJQb3NpdGlvbihldmVudCkge1xuICAgICAgY29uc3QgcG9pbnRlciA9IGV2ZW50LnBvaW50ZXJJZCA9PT0gcG9pbnRlcnNbMF0ucG9pbnRlcklkID8gcG9pbnRlcnNbMV0gOiBwb2ludGVyc1swXTtcbiAgICAgIHJldHVybiBwb2ludGVyUG9zaXRpb25zW3BvaW50ZXIucG9pbnRlcklkXTtcbiAgICB9IC8vXG5cblxuICAgIHNjb3BlLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBvbkNvbnRleHRNZW51KTtcbiAgICBzY29wZS5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgb25Qb2ludGVyRG93bik7XG4gICAgc2NvcGUuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyY2FuY2VsJywgb25Qb2ludGVyQ2FuY2VsKTtcbiAgICBzY29wZS5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgb25Nb3VzZVdoZWVsLCB7XG4gICAgICBwYXNzaXZlOiBmYWxzZVxuICAgIH0pOyAvLyBmb3JjZSBhbiB1cGRhdGUgYXQgc3RhcnRcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxufSAvLyBUaGlzIHNldCBvZiBjb250cm9scyBwZXJmb3JtcyBvcmJpdGluZywgZG9sbHlpbmcgKHpvb21pbmcpLCBhbmQgcGFubmluZy5cbi8vIFVubGlrZSBUcmFja2JhbGxDb250cm9scywgaXQgbWFpbnRhaW5zIHRoZSBcInVwXCIgZGlyZWN0aW9uIG9iamVjdC51cCAoK1kgYnkgZGVmYXVsdCkuXG4vLyBUaGlzIGlzIHZlcnkgc2ltaWxhciB0byBPcmJpdENvbnRyb2xzLCBhbm90aGVyIHNldCBvZiB0b3VjaCBiZWhhdmlvclxuLy9cbi8vICAgIE9yYml0IC0gcmlnaHQgbW91c2UsIG9yIGxlZnQgbW91c2UgKyBjdHJsL21ldGEvc2hpZnRLZXkgLyB0b3VjaDogdHdvLWZpbmdlciByb3RhdGVcbi8vICAgIFpvb20gLSBtaWRkbGUgbW91c2UsIG9yIG1vdXNld2hlZWwgLyB0b3VjaDogdHdvLWZpbmdlciBzcHJlYWQgb3Igc3F1aXNoXG4vLyAgICBQYW4gLSBsZWZ0IG1vdXNlLCBvciBhcnJvdyBrZXlzIC8gdG91Y2g6IG9uZS1maW5nZXIgbW92ZVxuXG5cbmNsYXNzIE1hcENvbnRyb2xzIGV4dGVuZHMgT3JiaXRDb250cm9scyB7XG4gIGNvbnN0cnVjdG9yKG9iamVjdCwgZG9tRWxlbWVudCkge1xuICAgIHN1cGVyKG9iamVjdCwgZG9tRWxlbWVudCk7XG4gICAgdGhpcy5zY3JlZW5TcGFjZVBhbm5pbmcgPSBmYWxzZTsgLy8gcGFuIG9ydGhvZ29uYWwgdG8gd29ybGQtc3BhY2UgZGlyZWN0aW9uIGNhbWVyYS51cFxuXG4gICAgdGhpcy5tb3VzZUJ1dHRvbnMuTEVGVCA9IE1PVVNFLlBBTjtcbiAgICB0aGlzLm1vdXNlQnV0dG9ucy5SSUdIVCA9IE1PVVNFLlJPVEFURTtcbiAgICB0aGlzLnRvdWNoZXMuT05FID0gVE9VQ0guUEFOO1xuICAgIHRoaXMudG91Y2hlcy5UV08gPSBUT1VDSC5ET0xMWV9ST1RBVEU7XG4gIH1cblxufVxuXG5leHBvcnQgeyBPcmJpdENvbnRyb2xzLCBNYXBDb250cm9scyB9OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/jsm/controls/OrbitControls.js\n");

/***/ }),

/***/ "./src/jsm/libs/stats.module.js":
/*!**************************************!*\
  !*** ./src/jsm/libs/stats.module.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Stats = function () {\n  var mode = 0;\n  var container = document.createElement('div');\n  container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';\n  container.addEventListener('click', function (event) {\n    event.preventDefault();\n    showPanel(++mode % container.children.length);\n  }, false); //\n\n  function addPanel(panel) {\n    container.appendChild(panel.dom);\n    return panel;\n  }\n\n  function showPanel(id) {\n    for (var i = 0; i < container.children.length; i++) {\n      container.children[i].style.display = i === id ? 'block' : 'none';\n    }\n\n    mode = id;\n  } //\n\n\n  var beginTime = (performance || Date).now(),\n      prevTime = beginTime,\n      frames = 0;\n  var fpsPanel = addPanel(new Stats.Panel('FPS', '#0ff', '#002'));\n  var msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));\n\n  if (self.performance && self.performance.memory) {\n    var memPanel = addPanel(new Stats.Panel('MB', '#f08', '#201'));\n  }\n\n  showPanel(0);\n  return {\n    REVISION: 16,\n    dom: container,\n    addPanel: addPanel,\n    showPanel: showPanel,\n    begin: function () {\n      beginTime = (performance || Date).now();\n    },\n    end: function () {\n      frames++;\n      var time = (performance || Date).now();\n      msPanel.update(time - beginTime, 200);\n\n      if (time >= prevTime + 1000) {\n        fpsPanel.update(frames * 1000 / (time - prevTime), 100);\n        prevTime = time;\n        frames = 0;\n\n        if (memPanel) {\n          var memory = performance.memory;\n          memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);\n        }\n      }\n\n      return time;\n    },\n    update: function () {\n      beginTime = this.end();\n    },\n    // Backwards Compatibility\n    domElement: container,\n    setMode: showPanel\n  };\n};\n\nStats.Panel = function (name, fg, bg) {\n  var min = Infinity,\n      max = 0,\n      round = Math.round;\n  var PR = round(window.devicePixelRatio || 1);\n  var WIDTH = 80 * PR,\n      HEIGHT = 48 * PR,\n      TEXT_X = 3 * PR,\n      TEXT_Y = 2 * PR,\n      GRAPH_X = 3 * PR,\n      GRAPH_Y = 15 * PR,\n      GRAPH_WIDTH = 74 * PR,\n      GRAPH_HEIGHT = 30 * PR;\n  var canvas = document.createElement('canvas');\n  canvas.width = WIDTH;\n  canvas.height = HEIGHT;\n  canvas.style.cssText = 'width:80px;height:48px';\n  var context = canvas.getContext('2d');\n  context.font = 'bold ' + 9 * PR + 'px Helvetica,Arial,sans-serif';\n  context.textBaseline = 'top';\n  context.fillStyle = bg;\n  context.fillRect(0, 0, WIDTH, HEIGHT);\n  context.fillStyle = fg;\n  context.fillText(name, TEXT_X, TEXT_Y);\n  context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);\n  context.fillStyle = bg;\n  context.globalAlpha = 0.9;\n  context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);\n  return {\n    dom: canvas,\n    update: function (value, maxValue) {\n      min = Math.min(min, value);\n      max = Math.max(max, value);\n      context.fillStyle = bg;\n      context.globalAlpha = 1;\n      context.fillRect(0, 0, WIDTH, GRAPH_Y);\n      context.fillStyle = fg;\n      context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);\n      context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);\n      context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);\n      context.fillStyle = bg;\n      context.globalAlpha = 0.9;\n      context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - value / maxValue) * GRAPH_HEIGHT));\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Stats);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanNtL2xpYnMvc3RhdHMubW9kdWxlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzbS9saWJzL3N0YXRzLm1vZHVsZS5qcz81N2RkIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBTdGF0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1vZGUgPSAwO1xuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjAuOTt6LWluZGV4OjEwMDAwJztcbiAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBzaG93UGFuZWwoKyttb2RlICUgY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aCk7XG4gIH0sIGZhbHNlKTsgLy9cblxuICBmdW5jdGlvbiBhZGRQYW5lbChwYW5lbCkge1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwYW5lbC5kb20pO1xuICAgIHJldHVybiBwYW5lbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dQYW5lbChpZCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb250YWluZXIuY2hpbGRyZW5baV0uc3R5bGUuZGlzcGxheSA9IGkgPT09IGlkID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICB9XG5cbiAgICBtb2RlID0gaWQ7XG4gIH0gLy9cblxuXG4gIHZhciBiZWdpblRpbWUgPSAocGVyZm9ybWFuY2UgfHwgRGF0ZSkubm93KCksXG4gICAgICBwcmV2VGltZSA9IGJlZ2luVGltZSxcbiAgICAgIGZyYW1lcyA9IDA7XG4gIHZhciBmcHNQYW5lbCA9IGFkZFBhbmVsKG5ldyBTdGF0cy5QYW5lbCgnRlBTJywgJyMwZmYnLCAnIzAwMicpKTtcbiAgdmFyIG1zUGFuZWwgPSBhZGRQYW5lbChuZXcgU3RhdHMuUGFuZWwoJ01TJywgJyMwZjAnLCAnIzAyMCcpKTtcblxuICBpZiAoc2VsZi5wZXJmb3JtYW5jZSAmJiBzZWxmLnBlcmZvcm1hbmNlLm1lbW9yeSkge1xuICAgIHZhciBtZW1QYW5lbCA9IGFkZFBhbmVsKG5ldyBTdGF0cy5QYW5lbCgnTUInLCAnI2YwOCcsICcjMjAxJykpO1xuICB9XG5cbiAgc2hvd1BhbmVsKDApO1xuICByZXR1cm4ge1xuICAgIFJFVklTSU9OOiAxNixcbiAgICBkb206IGNvbnRhaW5lcixcbiAgICBhZGRQYW5lbDogYWRkUGFuZWwsXG4gICAgc2hvd1BhbmVsOiBzaG93UGFuZWwsXG4gICAgYmVnaW46IGZ1bmN0aW9uICgpIHtcbiAgICAgIGJlZ2luVGltZSA9IChwZXJmb3JtYW5jZSB8fCBEYXRlKS5ub3coKTtcbiAgICB9LFxuICAgIGVuZDogZnVuY3Rpb24gKCkge1xuICAgICAgZnJhbWVzKys7XG4gICAgICB2YXIgdGltZSA9IChwZXJmb3JtYW5jZSB8fCBEYXRlKS5ub3coKTtcbiAgICAgIG1zUGFuZWwudXBkYXRlKHRpbWUgLSBiZWdpblRpbWUsIDIwMCk7XG5cbiAgICAgIGlmICh0aW1lID49IHByZXZUaW1lICsgMTAwMCkge1xuICAgICAgICBmcHNQYW5lbC51cGRhdGUoZnJhbWVzICogMTAwMCAvICh0aW1lIC0gcHJldlRpbWUpLCAxMDApO1xuICAgICAgICBwcmV2VGltZSA9IHRpbWU7XG4gICAgICAgIGZyYW1lcyA9IDA7XG5cbiAgICAgICAgaWYgKG1lbVBhbmVsKSB7XG4gICAgICAgICAgdmFyIG1lbW9yeSA9IHBlcmZvcm1hbmNlLm1lbW9yeTtcbiAgICAgICAgICBtZW1QYW5lbC51cGRhdGUobWVtb3J5LnVzZWRKU0hlYXBTaXplIC8gMTA0ODU3NiwgbWVtb3J5LmpzSGVhcFNpemVMaW1pdCAvIDEwNDg1NzYpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aW1lO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBiZWdpblRpbWUgPSB0aGlzLmVuZCgpO1xuICAgIH0sXG4gICAgLy8gQmFja3dhcmRzIENvbXBhdGliaWxpdHlcbiAgICBkb21FbGVtZW50OiBjb250YWluZXIsXG4gICAgc2V0TW9kZTogc2hvd1BhbmVsXG4gIH07XG59O1xuXG5TdGF0cy5QYW5lbCA9IGZ1bmN0aW9uIChuYW1lLCBmZywgYmcpIHtcbiAgdmFyIG1pbiA9IEluZmluaXR5LFxuICAgICAgbWF4ID0gMCxcbiAgICAgIHJvdW5kID0gTWF0aC5yb3VuZDtcbiAgdmFyIFBSID0gcm91bmQod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSk7XG4gIHZhciBXSURUSCA9IDgwICogUFIsXG4gICAgICBIRUlHSFQgPSA0OCAqIFBSLFxuICAgICAgVEVYVF9YID0gMyAqIFBSLFxuICAgICAgVEVYVF9ZID0gMiAqIFBSLFxuICAgICAgR1JBUEhfWCA9IDMgKiBQUixcbiAgICAgIEdSQVBIX1kgPSAxNSAqIFBSLFxuICAgICAgR1JBUEhfV0lEVEggPSA3NCAqIFBSLFxuICAgICAgR1JBUEhfSEVJR0hUID0gMzAgKiBQUjtcbiAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBjYW52YXMud2lkdGggPSBXSURUSDtcbiAgY2FudmFzLmhlaWdodCA9IEhFSUdIVDtcbiAgY2FudmFzLnN0eWxlLmNzc1RleHQgPSAnd2lkdGg6ODBweDtoZWlnaHQ6NDhweCc7XG4gIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGNvbnRleHQuZm9udCA9ICdib2xkICcgKyA5ICogUFIgKyAncHggSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYnO1xuICBjb250ZXh0LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuICBjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIFdJRFRILCBIRUlHSFQpO1xuICBjb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xuICBjb250ZXh0LmZpbGxUZXh0KG5hbWUsIFRFWFRfWCwgVEVYVF9ZKTtcbiAgY29udGV4dC5maWxsUmVjdChHUkFQSF9YLCBHUkFQSF9ZLCBHUkFQSF9XSURUSCwgR1JBUEhfSEVJR0hUKTtcbiAgY29udGV4dC5maWxsU3R5bGUgPSBiZztcbiAgY29udGV4dC5nbG9iYWxBbHBoYSA9IDAuOTtcbiAgY29udGV4dC5maWxsUmVjdChHUkFQSF9YLCBHUkFQSF9ZLCBHUkFQSF9XSURUSCwgR1JBUEhfSEVJR0hUKTtcbiAgcmV0dXJuIHtcbiAgICBkb206IGNhbnZhcyxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgbWF4VmFsdWUpIHtcbiAgICAgIG1pbiA9IE1hdGgubWluKG1pbiwgdmFsdWUpO1xuICAgICAgbWF4ID0gTWF0aC5tYXgobWF4LCB2YWx1ZSk7XG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIFdJRFRILCBHUkFQSF9ZKTtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmc7XG4gICAgICBjb250ZXh0LmZpbGxUZXh0KHJvdW5kKHZhbHVlKSArICcgJyArIG5hbWUgKyAnICgnICsgcm91bmQobWluKSArICctJyArIHJvdW5kKG1heCkgKyAnKScsIFRFWFRfWCwgVEVYVF9ZKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGNhbnZhcywgR1JBUEhfWCArIFBSLCBHUkFQSF9ZLCBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9IRUlHSFQsIEdSQVBIX1gsIEdSQVBIX1ksIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX0hFSUdIVCk7XG4gICAgICBjb250ZXh0LmZpbGxSZWN0KEdSQVBIX1ggKyBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9ZLCBQUiwgR1JBUEhfSEVJR0hUKTtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG4gICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gMC45O1xuICAgICAgY29udGV4dC5maWxsUmVjdChHUkFQSF9YICsgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfWSwgUFIsIHJvdW5kKCgxIC0gdmFsdWUgLyBtYXhWYWx1ZSkgKiBHUkFQSF9IRUlHSFQpKTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGF0czsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/jsm/libs/stats.module.js\n");

/***/ }),

/***/ "./src/jsm/loaders/RGBELoader.js":
/*!***************************************!*\
  !*** ./src/jsm/loaders/RGBELoader.js ***!
  \***************************************/
/*! exports provided: RGBELoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RGBELoader\", function() { return RGBELoader; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n // https://github.com/mrdoob/three.js/issues/5552\n// http://en.wikipedia.org/wiki/RGBE_image_format\n\nclass RGBELoader extends three__WEBPACK_IMPORTED_MODULE_0__[\"DataTextureLoader\"] {\n  constructor(manager) {\n    super(manager);\n    this.type = three__WEBPACK_IMPORTED_MODULE_0__[\"UnsignedByteType\"];\n  } // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html\n\n\n  parse(buffer) {\n    const\n    /* return codes for rgbe routines */\n    //RGBE_RETURN_SUCCESS = 0,\n    RGBE_RETURN_FAILURE = -1,\n\n    /* default error routine.  change this to change error handling */\n    rgbe_read_error = 1,\n          rgbe_write_error = 2,\n          rgbe_format_error = 3,\n          rgbe_memory_error = 4,\n          rgbe_error = function (rgbe_error_code, msg) {\n      switch (rgbe_error_code) {\n        case rgbe_read_error:\n          console.error('THREE.RGBELoader Read Error: ' + (msg || ''));\n          break;\n\n        case rgbe_write_error:\n          console.error('THREE.RGBELoader Write Error: ' + (msg || ''));\n          break;\n\n        case rgbe_format_error:\n          console.error('THREE.RGBELoader Bad File Format: ' + (msg || ''));\n          break;\n\n        default:\n        case rgbe_memory_error:\n          console.error('THREE.RGBELoader: Error: ' + (msg || ''));\n      }\n\n      return RGBE_RETURN_FAILURE;\n    },\n\n    /* offsets to red, green, and blue components in a data (float) pixel */\n    //RGBE_DATA_RED = 0,\n    //RGBE_DATA_GREEN = 1,\n    //RGBE_DATA_BLUE = 2,\n\n    /* number of floats per pixel, use 4 since stored in rgba image format */\n    //RGBE_DATA_SIZE = 4,\n\n    /* flags indicating which fields in an rgbe_header_info are valid */\n    RGBE_VALID_PROGRAMTYPE = 1,\n          RGBE_VALID_FORMAT = 2,\n          RGBE_VALID_DIMENSIONS = 4,\n          NEWLINE = '\\n',\n          fgets = function (buffer, lineLimit, consume) {\n      const chunkSize = 128;\n      lineLimit = !lineLimit ? 1024 : lineLimit;\n      let p = buffer.pos,\n          i = -1,\n          len = 0,\n          s = '',\n          chunk = String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));\n\n      while (0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer.byteLength) {\n        s += chunk;\n        len += chunk.length;\n        p += chunkSize;\n        chunk += String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));\n      }\n\n      if (-1 < i) {\n        /*for (i=l-1; i>=0; i--) {\r\n        \tbyteCode = m.charCodeAt(i);\r\n        \tif (byteCode > 0x7f && byteCode <= 0x7ff) byteLen++;\r\n        \telse if (byteCode > 0x7ff && byteCode <= 0xffff) byteLen += 2;\r\n        \tif (byteCode >= 0xDC00 && byteCode <= 0xDFFF) i--; //trail surrogate\r\n        }*/\n        if (false !== consume) buffer.pos += len + i + 1;\n        return s + chunk.slice(0, i);\n      }\n\n      return false;\n    },\n\n    /* minimal header reading.  modify if you want to parse more information */\n    RGBE_ReadHeader = function (buffer) {\n      // regexes to parse header info fields\n      const magic_token_re = /^#\\?(\\S+)/,\n            gamma_re = /^\\s*GAMMA\\s*=\\s*(\\d+(\\.\\d+)?)\\s*$/,\n            exposure_re = /^\\s*EXPOSURE\\s*=\\s*(\\d+(\\.\\d+)?)\\s*$/,\n            format_re = /^\\s*FORMAT=(\\S+)\\s*$/,\n            dimensions_re = /^\\s*\\-Y\\s+(\\d+)\\s+\\+X\\s+(\\d+)\\s*$/,\n            // RGBE format header struct\n      header = {\n        valid: 0,\n\n        /* indicate which fields are valid */\n        string: '',\n\n        /* the actual header string */\n        comments: '',\n\n        /* comments found in header */\n        programtype: 'RGBE',\n\n        /* listed at beginning of file to identify it after \"#?\". defaults to \"RGBE\" */\n        format: '',\n\n        /* RGBE format, default 32-bit_rle_rgbe */\n        gamma: 1.0,\n\n        /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */\n        exposure: 1.0,\n\n        /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */\n        width: 0,\n        height: 0\n        /* image dimensions, width/height */\n\n      };\n      let line, match;\n\n      if (buffer.pos >= buffer.byteLength || !(line = fgets(buffer))) {\n        return rgbe_error(rgbe_read_error, 'no header found');\n      }\n      /* if you want to require the magic token then uncomment the next line */\n\n\n      if (!(match = line.match(magic_token_re))) {\n        return rgbe_error(rgbe_format_error, 'bad initial token');\n      }\n\n      header.valid |= RGBE_VALID_PROGRAMTYPE;\n      header.programtype = match[1];\n      header.string += line + '\\n';\n\n      while (true) {\n        line = fgets(buffer);\n        if (false === line) break;\n        header.string += line + '\\n';\n\n        if ('#' === line.charAt(0)) {\n          header.comments += line + '\\n';\n          continue; // comment line\n        }\n\n        if (match = line.match(gamma_re)) {\n          header.gamma = parseFloat(match[1], 10);\n        }\n\n        if (match = line.match(exposure_re)) {\n          header.exposure = parseFloat(match[1], 10);\n        }\n\n        if (match = line.match(format_re)) {\n          header.valid |= RGBE_VALID_FORMAT;\n          header.format = match[1]; //'32-bit_rle_rgbe';\n        }\n\n        if (match = line.match(dimensions_re)) {\n          header.valid |= RGBE_VALID_DIMENSIONS;\n          header.height = parseInt(match[1], 10);\n          header.width = parseInt(match[2], 10);\n        }\n\n        if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS) break;\n      }\n\n      if (!(header.valid & RGBE_VALID_FORMAT)) {\n        return rgbe_error(rgbe_format_error, 'missing format specifier');\n      }\n\n      if (!(header.valid & RGBE_VALID_DIMENSIONS)) {\n        return rgbe_error(rgbe_format_error, 'missing image size specifier');\n      }\n\n      return header;\n    },\n          RGBE_ReadPixels_RLE = function (buffer, w, h) {\n      const scanline_width = w;\n\n      if ( // run length encoding is not allowed so read flat\n      scanline_width < 8 || scanline_width > 0x7fff || // this file is not run length encoded\n      2 !== buffer[0] || 2 !== buffer[1] || buffer[2] & 0x80) {\n        // return the flat buffer\n        return new Uint8Array(buffer);\n      }\n\n      if (scanline_width !== (buffer[2] << 8 | buffer[3])) {\n        return rgbe_error(rgbe_format_error, 'wrong scanline width');\n      }\n\n      const data_rgba = new Uint8Array(4 * w * h);\n\n      if (!data_rgba.length) {\n        return rgbe_error(rgbe_memory_error, 'unable to allocate buffer space');\n      }\n\n      let offset = 0,\n          pos = 0;\n      const ptr_end = 4 * scanline_width;\n      const rgbeStart = new Uint8Array(4);\n      const scanline_buffer = new Uint8Array(ptr_end);\n      let num_scanlines = h; // read in each successive scanline\n\n      while (num_scanlines > 0 && pos < buffer.byteLength) {\n        if (pos + 4 > buffer.byteLength) {\n          return rgbe_error(rgbe_read_error);\n        }\n\n        rgbeStart[0] = buffer[pos++];\n        rgbeStart[1] = buffer[pos++];\n        rgbeStart[2] = buffer[pos++];\n        rgbeStart[3] = buffer[pos++];\n\n        if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) {\n          return rgbe_error(rgbe_format_error, 'bad rgbe scanline format');\n        } // read each of the four channels for the scanline into the buffer\n        // first red, then green, then blue, then exponent\n\n\n        let ptr = 0,\n            count;\n\n        while (ptr < ptr_end && pos < buffer.byteLength) {\n          count = buffer[pos++];\n          const isEncodedRun = count > 128;\n          if (isEncodedRun) count -= 128;\n\n          if (0 === count || ptr + count > ptr_end) {\n            return rgbe_error(rgbe_format_error, 'bad scanline data');\n          }\n\n          if (isEncodedRun) {\n            // a (encoded) run of the same value\n            const byteValue = buffer[pos++];\n\n            for (let i = 0; i < count; i++) {\n              scanline_buffer[ptr++] = byteValue;\n            } //ptr += count;\n\n          } else {\n            // a literal-run\n            scanline_buffer.set(buffer.subarray(pos, pos + count), ptr);\n            ptr += count;\n            pos += count;\n          }\n        } // now convert data from buffer into rgba\n        // first red, then green, then blue, then exponent (alpha)\n\n\n        const l = scanline_width; //scanline_buffer.byteLength;\n\n        for (let i = 0; i < l; i++) {\n          let off = 0;\n          data_rgba[offset] = scanline_buffer[i + off];\n          off += scanline_width; //1;\n\n          data_rgba[offset + 1] = scanline_buffer[i + off];\n          off += scanline_width; //1;\n\n          data_rgba[offset + 2] = scanline_buffer[i + off];\n          off += scanline_width; //1;\n\n          data_rgba[offset + 3] = scanline_buffer[i + off];\n          offset += 4;\n        }\n\n        num_scanlines--;\n      }\n\n      return data_rgba;\n    };\n\n    const RGBEByteToRGBFloat = function (sourceArray, sourceOffset, destArray, destOffset) {\n      const e = sourceArray[sourceOffset + 3];\n      const scale = Math.pow(2.0, e - 128.0) / 255.0;\n      destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale;\n      destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale;\n      destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale;\n    };\n\n    const RGBEByteToRGBHalf = function (sourceArray, sourceOffset, destArray, destOffset) {\n      const e = sourceArray[sourceOffset + 3];\n      const scale = Math.pow(2.0, e - 128.0) / 255.0;\n      destArray[destOffset + 0] = three__WEBPACK_IMPORTED_MODULE_0__[\"DataUtils\"].toHalfFloat(sourceArray[sourceOffset + 0] * scale);\n      destArray[destOffset + 1] = three__WEBPACK_IMPORTED_MODULE_0__[\"DataUtils\"].toHalfFloat(sourceArray[sourceOffset + 1] * scale);\n      destArray[destOffset + 2] = three__WEBPACK_IMPORTED_MODULE_0__[\"DataUtils\"].toHalfFloat(sourceArray[sourceOffset + 2] * scale);\n    };\n\n    const byteArray = new Uint8Array(buffer);\n    byteArray.pos = 0;\n    const rgbe_header_info = RGBE_ReadHeader(byteArray);\n\n    if (RGBE_RETURN_FAILURE !== rgbe_header_info) {\n      const w = rgbe_header_info.width,\n            h = rgbe_header_info.height,\n            image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);\n\n      if (RGBE_RETURN_FAILURE !== image_rgba_data) {\n        let data, format, type;\n        let numElements;\n\n        switch (this.type) {\n          case three__WEBPACK_IMPORTED_MODULE_0__[\"UnsignedByteType\"]:\n            data = image_rgba_data;\n            format = three__WEBPACK_IMPORTED_MODULE_0__[\"RGBEFormat\"]; // handled as THREE.RGBAFormat in shaders\n\n            type = three__WEBPACK_IMPORTED_MODULE_0__[\"UnsignedByteType\"];\n            break;\n\n          case three__WEBPACK_IMPORTED_MODULE_0__[\"FloatType\"]:\n            numElements = image_rgba_data.length / 4 * 3;\n            const floatArray = new Float32Array(numElements);\n\n            for (let j = 0; j < numElements; j++) {\n              RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 3);\n            }\n\n            data = floatArray;\n            format = three__WEBPACK_IMPORTED_MODULE_0__[\"RGBFormat\"];\n            type = three__WEBPACK_IMPORTED_MODULE_0__[\"FloatType\"];\n            break;\n\n          case three__WEBPACK_IMPORTED_MODULE_0__[\"HalfFloatType\"]:\n            numElements = image_rgba_data.length / 4 * 3;\n            const halfArray = new Uint16Array(numElements);\n\n            for (let j = 0; j < numElements; j++) {\n              RGBEByteToRGBHalf(image_rgba_data, j * 4, halfArray, j * 3);\n            }\n\n            data = halfArray;\n            format = three__WEBPACK_IMPORTED_MODULE_0__[\"RGBFormat\"];\n            type = three__WEBPACK_IMPORTED_MODULE_0__[\"HalfFloatType\"];\n            break;\n\n          default:\n            console.error('THREE.RGBELoader: unsupported type: ', this.type);\n            break;\n        }\n\n        return {\n          width: w,\n          height: h,\n          data: data,\n          header: rgbe_header_info.string,\n          gamma: rgbe_header_info.gamma,\n          exposure: rgbe_header_info.exposure,\n          format: format,\n          type: type\n        };\n      }\n    }\n\n    return null;\n  }\n\n  setDataType(value) {\n    this.type = value;\n    return this;\n  }\n\n  load(url, onLoad, onProgress, onError) {\n    function onLoadCallback(texture, texData) {\n      switch (texture.type) {\n        case three__WEBPACK_IMPORTED_MODULE_0__[\"UnsignedByteType\"]:\n          texture.encoding = three__WEBPACK_IMPORTED_MODULE_0__[\"RGBEEncoding\"];\n          texture.minFilter = three__WEBPACK_IMPORTED_MODULE_0__[\"NearestFilter\"];\n          texture.magFilter = three__WEBPACK_IMPORTED_MODULE_0__[\"NearestFilter\"];\n          texture.generateMipmaps = false;\n          texture.flipY = true;\n          break;\n\n        case three__WEBPACK_IMPORTED_MODULE_0__[\"FloatType\"]:\n          texture.encoding = three__WEBPACK_IMPORTED_MODULE_0__[\"LinearEncoding\"];\n          texture.minFilter = three__WEBPACK_IMPORTED_MODULE_0__[\"LinearFilter\"];\n          texture.magFilter = three__WEBPACK_IMPORTED_MODULE_0__[\"LinearFilter\"];\n          texture.generateMipmaps = false;\n          texture.flipY = true;\n          break;\n\n        case three__WEBPACK_IMPORTED_MODULE_0__[\"HalfFloatType\"]:\n          texture.encoding = three__WEBPACK_IMPORTED_MODULE_0__[\"LinearEncoding\"];\n          texture.minFilter = three__WEBPACK_IMPORTED_MODULE_0__[\"LinearFilter\"];\n          texture.magFilter = three__WEBPACK_IMPORTED_MODULE_0__[\"LinearFilter\"];\n          texture.generateMipmaps = false;\n          texture.flipY = true;\n          break;\n      }\n\n      if (onLoad) onLoad(texture, texData);\n    }\n\n    return super.load(url, onLoadCallback, onProgress, onError);\n  }\n\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanNtL2xvYWRlcnMvUkdCRUxvYWRlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qc20vbG9hZGVycy9SR0JFTG9hZGVyLmpzPzRkNTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YVRleHR1cmVMb2FkZXIsIERhdGFVdGlscywgRmxvYXRUeXBlLCBIYWxmRmxvYXRUeXBlLCBMaW5lYXJFbmNvZGluZywgTGluZWFyRmlsdGVyLCBOZWFyZXN0RmlsdGVyLCBSR0JFRW5jb2RpbmcsIFJHQkVGb3JtYXQsIFJHQkZvcm1hdCwgVW5zaWduZWRCeXRlVHlwZSB9IGZyb20gJ3RocmVlJzsgLy8gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9pc3N1ZXMvNTU1MlxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9SR0JFX2ltYWdlX2Zvcm1hdFxuXG5jbGFzcyBSR0JFTG9hZGVyIGV4dGVuZHMgRGF0YVRleHR1cmVMb2FkZXIge1xuICBjb25zdHJ1Y3RvcihtYW5hZ2VyKSB7XG4gICAgc3VwZXIobWFuYWdlcik7XG4gICAgdGhpcy50eXBlID0gVW5zaWduZWRCeXRlVHlwZTtcbiAgfSAvLyBhZGFwdGVkIGZyb20gaHR0cDovL3d3dy5ncmFwaGljcy5jb3JuZWxsLmVkdS9+Ymp3L3JnYmUuaHRtbFxuXG5cbiAgcGFyc2UoYnVmZmVyKSB7XG4gICAgY29uc3RcbiAgICAvKiByZXR1cm4gY29kZXMgZm9yIHJnYmUgcm91dGluZXMgKi9cbiAgICAvL1JHQkVfUkVUVVJOX1NVQ0NFU1MgPSAwLFxuICAgIFJHQkVfUkVUVVJOX0ZBSUxVUkUgPSAtMSxcblxuICAgIC8qIGRlZmF1bHQgZXJyb3Igcm91dGluZS4gIGNoYW5nZSB0aGlzIHRvIGNoYW5nZSBlcnJvciBoYW5kbGluZyAqL1xuICAgIHJnYmVfcmVhZF9lcnJvciA9IDEsXG4gICAgICAgICAgcmdiZV93cml0ZV9lcnJvciA9IDIsXG4gICAgICAgICAgcmdiZV9mb3JtYXRfZXJyb3IgPSAzLFxuICAgICAgICAgIHJnYmVfbWVtb3J5X2Vycm9yID0gNCxcbiAgICAgICAgICByZ2JlX2Vycm9yID0gZnVuY3Rpb24gKHJnYmVfZXJyb3JfY29kZSwgbXNnKSB7XG4gICAgICBzd2l0Y2ggKHJnYmVfZXJyb3JfY29kZSkge1xuICAgICAgICBjYXNlIHJnYmVfcmVhZF9lcnJvcjpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdUSFJFRS5SR0JFTG9hZGVyIFJlYWQgRXJyb3I6ICcgKyAobXNnIHx8ICcnKSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSByZ2JlX3dyaXRlX2Vycm9yOlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RIUkVFLlJHQkVMb2FkZXIgV3JpdGUgRXJyb3I6ICcgKyAobXNnIHx8ICcnKSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSByZ2JlX2Zvcm1hdF9lcnJvcjpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdUSFJFRS5SR0JFTG9hZGVyIEJhZCBGaWxlIEZvcm1hdDogJyArIChtc2cgfHwgJycpKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBjYXNlIHJnYmVfbWVtb3J5X2Vycm9yOlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RIUkVFLlJHQkVMb2FkZXI6IEVycm9yOiAnICsgKG1zZyB8fCAnJykpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gUkdCRV9SRVRVUk5fRkFJTFVSRTtcbiAgICB9LFxuXG4gICAgLyogb2Zmc2V0cyB0byByZWQsIGdyZWVuLCBhbmQgYmx1ZSBjb21wb25lbnRzIGluIGEgZGF0YSAoZmxvYXQpIHBpeGVsICovXG4gICAgLy9SR0JFX0RBVEFfUkVEID0gMCxcbiAgICAvL1JHQkVfREFUQV9HUkVFTiA9IDEsXG4gICAgLy9SR0JFX0RBVEFfQkxVRSA9IDIsXG5cbiAgICAvKiBudW1iZXIgb2YgZmxvYXRzIHBlciBwaXhlbCwgdXNlIDQgc2luY2Ugc3RvcmVkIGluIHJnYmEgaW1hZ2UgZm9ybWF0ICovXG4gICAgLy9SR0JFX0RBVEFfU0laRSA9IDQsXG5cbiAgICAvKiBmbGFncyBpbmRpY2F0aW5nIHdoaWNoIGZpZWxkcyBpbiBhbiByZ2JlX2hlYWRlcl9pbmZvIGFyZSB2YWxpZCAqL1xuICAgIFJHQkVfVkFMSURfUFJPR1JBTVRZUEUgPSAxLFxuICAgICAgICAgIFJHQkVfVkFMSURfRk9STUFUID0gMixcbiAgICAgICAgICBSR0JFX1ZBTElEX0RJTUVOU0lPTlMgPSA0LFxuICAgICAgICAgIE5FV0xJTkUgPSAnXFxuJyxcbiAgICAgICAgICBmZ2V0cyA9IGZ1bmN0aW9uIChidWZmZXIsIGxpbmVMaW1pdCwgY29uc3VtZSkge1xuICAgICAgY29uc3QgY2h1bmtTaXplID0gMTI4O1xuICAgICAgbGluZUxpbWl0ID0gIWxpbmVMaW1pdCA/IDEwMjQgOiBsaW5lTGltaXQ7XG4gICAgICBsZXQgcCA9IGJ1ZmZlci5wb3MsXG4gICAgICAgICAgaSA9IC0xLFxuICAgICAgICAgIGxlbiA9IDAsXG4gICAgICAgICAgcyA9ICcnLFxuICAgICAgICAgIGNodW5rID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDE2QXJyYXkoYnVmZmVyLnN1YmFycmF5KHAsIHAgKyBjaHVua1NpemUpKSk7XG5cbiAgICAgIHdoaWxlICgwID4gKGkgPSBjaHVuay5pbmRleE9mKE5FV0xJTkUpKSAmJiBsZW4gPCBsaW5lTGltaXQgJiYgcCA8IGJ1ZmZlci5ieXRlTGVuZ3RoKSB7XG4gICAgICAgIHMgKz0gY2h1bms7XG4gICAgICAgIGxlbiArPSBjaHVuay5sZW5ndGg7XG4gICAgICAgIHAgKz0gY2h1bmtTaXplO1xuICAgICAgICBjaHVuayArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50MTZBcnJheShidWZmZXIuc3ViYXJyYXkocCwgcCArIGNodW5rU2l6ZSkpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKC0xIDwgaSkge1xuICAgICAgICAvKmZvciAoaT1sLTE7IGk+PTA7IGktLSkge1xyXG4gICAgICAgIFx0Ynl0ZUNvZGUgPSBtLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgXHRpZiAoYnl0ZUNvZGUgPiAweDdmICYmIGJ5dGVDb2RlIDw9IDB4N2ZmKSBieXRlTGVuKys7XHJcbiAgICAgICAgXHRlbHNlIGlmIChieXRlQ29kZSA+IDB4N2ZmICYmIGJ5dGVDb2RlIDw9IDB4ZmZmZikgYnl0ZUxlbiArPSAyO1xyXG4gICAgICAgIFx0aWYgKGJ5dGVDb2RlID49IDB4REMwMCAmJiBieXRlQ29kZSA8PSAweERGRkYpIGktLTsgLy90cmFpbCBzdXJyb2dhdGVcclxuICAgICAgICB9Ki9cbiAgICAgICAgaWYgKGZhbHNlICE9PSBjb25zdW1lKSBidWZmZXIucG9zICs9IGxlbiArIGkgKyAxO1xuICAgICAgICByZXR1cm4gcyArIGNodW5rLnNsaWNlKDAsIGkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8qIG1pbmltYWwgaGVhZGVyIHJlYWRpbmcuICBtb2RpZnkgaWYgeW91IHdhbnQgdG8gcGFyc2UgbW9yZSBpbmZvcm1hdGlvbiAqL1xuICAgIFJHQkVfUmVhZEhlYWRlciA9IGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgIC8vIHJlZ2V4ZXMgdG8gcGFyc2UgaGVhZGVyIGluZm8gZmllbGRzXG4gICAgICBjb25zdCBtYWdpY190b2tlbl9yZSA9IC9eI1xcPyhcXFMrKS8sXG4gICAgICAgICAgICBnYW1tYV9yZSA9IC9eXFxzKkdBTU1BXFxzKj1cXHMqKFxcZCsoXFwuXFxkKyk/KVxccyokLyxcbiAgICAgICAgICAgIGV4cG9zdXJlX3JlID0gL15cXHMqRVhQT1NVUkVcXHMqPVxccyooXFxkKyhcXC5cXGQrKT8pXFxzKiQvLFxuICAgICAgICAgICAgZm9ybWF0X3JlID0gL15cXHMqRk9STUFUPShcXFMrKVxccyokLyxcbiAgICAgICAgICAgIGRpbWVuc2lvbnNfcmUgPSAvXlxccypcXC1ZXFxzKyhcXGQrKVxccytcXCtYXFxzKyhcXGQrKVxccyokLyxcbiAgICAgICAgICAgIC8vIFJHQkUgZm9ybWF0IGhlYWRlciBzdHJ1Y3RcbiAgICAgIGhlYWRlciA9IHtcbiAgICAgICAgdmFsaWQ6IDAsXG5cbiAgICAgICAgLyogaW5kaWNhdGUgd2hpY2ggZmllbGRzIGFyZSB2YWxpZCAqL1xuICAgICAgICBzdHJpbmc6ICcnLFxuXG4gICAgICAgIC8qIHRoZSBhY3R1YWwgaGVhZGVyIHN0cmluZyAqL1xuICAgICAgICBjb21tZW50czogJycsXG5cbiAgICAgICAgLyogY29tbWVudHMgZm91bmQgaW4gaGVhZGVyICovXG4gICAgICAgIHByb2dyYW10eXBlOiAnUkdCRScsXG5cbiAgICAgICAgLyogbGlzdGVkIGF0IGJlZ2lubmluZyBvZiBmaWxlIHRvIGlkZW50aWZ5IGl0IGFmdGVyIFwiIz9cIi4gZGVmYXVsdHMgdG8gXCJSR0JFXCIgKi9cbiAgICAgICAgZm9ybWF0OiAnJyxcblxuICAgICAgICAvKiBSR0JFIGZvcm1hdCwgZGVmYXVsdCAzMi1iaXRfcmxlX3JnYmUgKi9cbiAgICAgICAgZ2FtbWE6IDEuMCxcblxuICAgICAgICAvKiBpbWFnZSBoYXMgYWxyZWFkeSBiZWVuIGdhbW1hIGNvcnJlY3RlZCB3aXRoIGdpdmVuIGdhbW1hLiBkZWZhdWx0cyB0byAxLjAgKG5vIGNvcnJlY3Rpb24pICovXG4gICAgICAgIGV4cG9zdXJlOiAxLjAsXG5cbiAgICAgICAgLyogYSB2YWx1ZSBvZiAxLjAgaW4gYW4gaW1hZ2UgY29ycmVzcG9uZHMgdG8gPGV4cG9zdXJlPiB3YXR0cy9zdGVyYWRpYW4vbV4yLiBkZWZhdWx0cyB0byAxLjAgKi9cbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMFxuICAgICAgICAvKiBpbWFnZSBkaW1lbnNpb25zLCB3aWR0aC9oZWlnaHQgKi9cblxuICAgICAgfTtcbiAgICAgIGxldCBsaW5lLCBtYXRjaDtcblxuICAgICAgaWYgKGJ1ZmZlci5wb3MgPj0gYnVmZmVyLmJ5dGVMZW5ndGggfHwgIShsaW5lID0gZmdldHMoYnVmZmVyKSkpIHtcbiAgICAgICAgcmV0dXJuIHJnYmVfZXJyb3IocmdiZV9yZWFkX2Vycm9yLCAnbm8gaGVhZGVyIGZvdW5kJyk7XG4gICAgICB9XG4gICAgICAvKiBpZiB5b3Ugd2FudCB0byByZXF1aXJlIHRoZSBtYWdpYyB0b2tlbiB0aGVuIHVuY29tbWVudCB0aGUgbmV4dCBsaW5lICovXG5cblxuICAgICAgaWYgKCEobWF0Y2ggPSBsaW5lLm1hdGNoKG1hZ2ljX3Rva2VuX3JlKSkpIHtcbiAgICAgICAgcmV0dXJuIHJnYmVfZXJyb3IocmdiZV9mb3JtYXRfZXJyb3IsICdiYWQgaW5pdGlhbCB0b2tlbicpO1xuICAgICAgfVxuXG4gICAgICBoZWFkZXIudmFsaWQgfD0gUkdCRV9WQUxJRF9QUk9HUkFNVFlQRTtcbiAgICAgIGhlYWRlci5wcm9ncmFtdHlwZSA9IG1hdGNoWzFdO1xuICAgICAgaGVhZGVyLnN0cmluZyArPSBsaW5lICsgJ1xcbic7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxpbmUgPSBmZ2V0cyhidWZmZXIpO1xuICAgICAgICBpZiAoZmFsc2UgPT09IGxpbmUpIGJyZWFrO1xuICAgICAgICBoZWFkZXIuc3RyaW5nICs9IGxpbmUgKyAnXFxuJztcblxuICAgICAgICBpZiAoJyMnID09PSBsaW5lLmNoYXJBdCgwKSkge1xuICAgICAgICAgIGhlYWRlci5jb21tZW50cyArPSBsaW5lICsgJ1xcbic7XG4gICAgICAgICAgY29udGludWU7IC8vIGNvbW1lbnQgbGluZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoID0gbGluZS5tYXRjaChnYW1tYV9yZSkpIHtcbiAgICAgICAgICBoZWFkZXIuZ2FtbWEgPSBwYXJzZUZsb2F0KG1hdGNoWzFdLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2ggPSBsaW5lLm1hdGNoKGV4cG9zdXJlX3JlKSkge1xuICAgICAgICAgIGhlYWRlci5leHBvc3VyZSA9IHBhcnNlRmxvYXQobWF0Y2hbMV0sIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaCA9IGxpbmUubWF0Y2goZm9ybWF0X3JlKSkge1xuICAgICAgICAgIGhlYWRlci52YWxpZCB8PSBSR0JFX1ZBTElEX0ZPUk1BVDtcbiAgICAgICAgICBoZWFkZXIuZm9ybWF0ID0gbWF0Y2hbMV07IC8vJzMyLWJpdF9ybGVfcmdiZSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2ggPSBsaW5lLm1hdGNoKGRpbWVuc2lvbnNfcmUpKSB7XG4gICAgICAgICAgaGVhZGVyLnZhbGlkIHw9IFJHQkVfVkFMSURfRElNRU5TSU9OUztcbiAgICAgICAgICBoZWFkZXIuaGVpZ2h0ID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICAgICAgICBoZWFkZXIud2lkdGggPSBwYXJzZUludChtYXRjaFsyXSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhlYWRlci52YWxpZCAmIFJHQkVfVkFMSURfRk9STUFUICYmIGhlYWRlci52YWxpZCAmIFJHQkVfVkFMSURfRElNRU5TSU9OUykgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmICghKGhlYWRlci52YWxpZCAmIFJHQkVfVkFMSURfRk9STUFUKSkge1xuICAgICAgICByZXR1cm4gcmdiZV9lcnJvcihyZ2JlX2Zvcm1hdF9lcnJvciwgJ21pc3NpbmcgZm9ybWF0IHNwZWNpZmllcicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShoZWFkZXIudmFsaWQgJiBSR0JFX1ZBTElEX0RJTUVOU0lPTlMpKSB7XG4gICAgICAgIHJldHVybiByZ2JlX2Vycm9yKHJnYmVfZm9ybWF0X2Vycm9yLCAnbWlzc2luZyBpbWFnZSBzaXplIHNwZWNpZmllcicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVhZGVyO1xuICAgIH0sXG4gICAgICAgICAgUkdCRV9SZWFkUGl4ZWxzX1JMRSA9IGZ1bmN0aW9uIChidWZmZXIsIHcsIGgpIHtcbiAgICAgIGNvbnN0IHNjYW5saW5lX3dpZHRoID0gdztcblxuICAgICAgaWYgKCAvLyBydW4gbGVuZ3RoIGVuY29kaW5nIGlzIG5vdCBhbGxvd2VkIHNvIHJlYWQgZmxhdFxuICAgICAgc2NhbmxpbmVfd2lkdGggPCA4IHx8IHNjYW5saW5lX3dpZHRoID4gMHg3ZmZmIHx8IC8vIHRoaXMgZmlsZSBpcyBub3QgcnVuIGxlbmd0aCBlbmNvZGVkXG4gICAgICAyICE9PSBidWZmZXJbMF0gfHwgMiAhPT0gYnVmZmVyWzFdIHx8IGJ1ZmZlclsyXSAmIDB4ODApIHtcbiAgICAgICAgLy8gcmV0dXJuIHRoZSBmbGF0IGJ1ZmZlclxuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjYW5saW5lX3dpZHRoICE9PSAoYnVmZmVyWzJdIDw8IDggfCBidWZmZXJbM10pKSB7XG4gICAgICAgIHJldHVybiByZ2JlX2Vycm9yKHJnYmVfZm9ybWF0X2Vycm9yLCAnd3Jvbmcgc2NhbmxpbmUgd2lkdGgnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YV9yZ2JhID0gbmV3IFVpbnQ4QXJyYXkoNCAqIHcgKiBoKTtcblxuICAgICAgaWYgKCFkYXRhX3JnYmEubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZ2JlX2Vycm9yKHJnYmVfbWVtb3J5X2Vycm9yLCAndW5hYmxlIHRvIGFsbG9jYXRlIGJ1ZmZlciBzcGFjZScpO1xuICAgICAgfVxuXG4gICAgICBsZXQgb2Zmc2V0ID0gMCxcbiAgICAgICAgICBwb3MgPSAwO1xuICAgICAgY29uc3QgcHRyX2VuZCA9IDQgKiBzY2FubGluZV93aWR0aDtcbiAgICAgIGNvbnN0IHJnYmVTdGFydCA9IG5ldyBVaW50OEFycmF5KDQpO1xuICAgICAgY29uc3Qgc2NhbmxpbmVfYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkocHRyX2VuZCk7XG4gICAgICBsZXQgbnVtX3NjYW5saW5lcyA9IGg7IC8vIHJlYWQgaW4gZWFjaCBzdWNjZXNzaXZlIHNjYW5saW5lXG5cbiAgICAgIHdoaWxlIChudW1fc2NhbmxpbmVzID4gMCAmJiBwb3MgPCBidWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgICBpZiAocG9zICsgNCA+IGJ1ZmZlci5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHJnYmVfZXJyb3IocmdiZV9yZWFkX2Vycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJnYmVTdGFydFswXSA9IGJ1ZmZlcltwb3MrK107XG4gICAgICAgIHJnYmVTdGFydFsxXSA9IGJ1ZmZlcltwb3MrK107XG4gICAgICAgIHJnYmVTdGFydFsyXSA9IGJ1ZmZlcltwb3MrK107XG4gICAgICAgIHJnYmVTdGFydFszXSA9IGJ1ZmZlcltwb3MrK107XG5cbiAgICAgICAgaWYgKDIgIT0gcmdiZVN0YXJ0WzBdIHx8IDIgIT0gcmdiZVN0YXJ0WzFdIHx8IChyZ2JlU3RhcnRbMl0gPDwgOCB8IHJnYmVTdGFydFszXSkgIT0gc2NhbmxpbmVfd2lkdGgpIHtcbiAgICAgICAgICByZXR1cm4gcmdiZV9lcnJvcihyZ2JlX2Zvcm1hdF9lcnJvciwgJ2JhZCByZ2JlIHNjYW5saW5lIGZvcm1hdCcpO1xuICAgICAgICB9IC8vIHJlYWQgZWFjaCBvZiB0aGUgZm91ciBjaGFubmVscyBmb3IgdGhlIHNjYW5saW5lIGludG8gdGhlIGJ1ZmZlclxuICAgICAgICAvLyBmaXJzdCByZWQsIHRoZW4gZ3JlZW4sIHRoZW4gYmx1ZSwgdGhlbiBleHBvbmVudFxuXG5cbiAgICAgICAgbGV0IHB0ciA9IDAsXG4gICAgICAgICAgICBjb3VudDtcblxuICAgICAgICB3aGlsZSAocHRyIDwgcHRyX2VuZCAmJiBwb3MgPCBidWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgICAgIGNvdW50ID0gYnVmZmVyW3BvcysrXTtcbiAgICAgICAgICBjb25zdCBpc0VuY29kZWRSdW4gPSBjb3VudCA+IDEyODtcbiAgICAgICAgICBpZiAoaXNFbmNvZGVkUnVuKSBjb3VudCAtPSAxMjg7XG5cbiAgICAgICAgICBpZiAoMCA9PT0gY291bnQgfHwgcHRyICsgY291bnQgPiBwdHJfZW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gcmdiZV9lcnJvcihyZ2JlX2Zvcm1hdF9lcnJvciwgJ2JhZCBzY2FubGluZSBkYXRhJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzRW5jb2RlZFJ1bikge1xuICAgICAgICAgICAgLy8gYSAoZW5jb2RlZCkgcnVuIG9mIHRoZSBzYW1lIHZhbHVlXG4gICAgICAgICAgICBjb25zdCBieXRlVmFsdWUgPSBidWZmZXJbcG9zKytdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgc2NhbmxpbmVfYnVmZmVyW3B0cisrXSA9IGJ5dGVWYWx1ZTtcbiAgICAgICAgICAgIH0gLy9wdHIgKz0gY291bnQ7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gYSBsaXRlcmFsLXJ1blxuICAgICAgICAgICAgc2NhbmxpbmVfYnVmZmVyLnNldChidWZmZXIuc3ViYXJyYXkocG9zLCBwb3MgKyBjb3VudCksIHB0cik7XG4gICAgICAgICAgICBwdHIgKz0gY291bnQ7XG4gICAgICAgICAgICBwb3MgKz0gY291bnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIG5vdyBjb252ZXJ0IGRhdGEgZnJvbSBidWZmZXIgaW50byByZ2JhXG4gICAgICAgIC8vIGZpcnN0IHJlZCwgdGhlbiBncmVlbiwgdGhlbiBibHVlLCB0aGVuIGV4cG9uZW50IChhbHBoYSlcblxuXG4gICAgICAgIGNvbnN0IGwgPSBzY2FubGluZV93aWR0aDsgLy9zY2FubGluZV9idWZmZXIuYnl0ZUxlbmd0aDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGxldCBvZmYgPSAwO1xuICAgICAgICAgIGRhdGFfcmdiYVtvZmZzZXRdID0gc2NhbmxpbmVfYnVmZmVyW2kgKyBvZmZdO1xuICAgICAgICAgIG9mZiArPSBzY2FubGluZV93aWR0aDsgLy8xO1xuXG4gICAgICAgICAgZGF0YV9yZ2JhW29mZnNldCArIDFdID0gc2NhbmxpbmVfYnVmZmVyW2kgKyBvZmZdO1xuICAgICAgICAgIG9mZiArPSBzY2FubGluZV93aWR0aDsgLy8xO1xuXG4gICAgICAgICAgZGF0YV9yZ2JhW29mZnNldCArIDJdID0gc2NhbmxpbmVfYnVmZmVyW2kgKyBvZmZdO1xuICAgICAgICAgIG9mZiArPSBzY2FubGluZV93aWR0aDsgLy8xO1xuXG4gICAgICAgICAgZGF0YV9yZ2JhW29mZnNldCArIDNdID0gc2NhbmxpbmVfYnVmZmVyW2kgKyBvZmZdO1xuICAgICAgICAgIG9mZnNldCArPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgbnVtX3NjYW5saW5lcy0tO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YV9yZ2JhO1xuICAgIH07XG5cbiAgICBjb25zdCBSR0JFQnl0ZVRvUkdCRmxvYXQgPSBmdW5jdGlvbiAoc291cmNlQXJyYXksIHNvdXJjZU9mZnNldCwgZGVzdEFycmF5LCBkZXN0T2Zmc2V0KSB7XG4gICAgICBjb25zdCBlID0gc291cmNlQXJyYXlbc291cmNlT2Zmc2V0ICsgM107XG4gICAgICBjb25zdCBzY2FsZSA9IE1hdGgucG93KDIuMCwgZSAtIDEyOC4wKSAvIDI1NS4wO1xuICAgICAgZGVzdEFycmF5W2Rlc3RPZmZzZXQgKyAwXSA9IHNvdXJjZUFycmF5W3NvdXJjZU9mZnNldCArIDBdICogc2NhbGU7XG4gICAgICBkZXN0QXJyYXlbZGVzdE9mZnNldCArIDFdID0gc291cmNlQXJyYXlbc291cmNlT2Zmc2V0ICsgMV0gKiBzY2FsZTtcbiAgICAgIGRlc3RBcnJheVtkZXN0T2Zmc2V0ICsgMl0gPSBzb3VyY2VBcnJheVtzb3VyY2VPZmZzZXQgKyAyXSAqIHNjYWxlO1xuICAgIH07XG5cbiAgICBjb25zdCBSR0JFQnl0ZVRvUkdCSGFsZiA9IGZ1bmN0aW9uIChzb3VyY2VBcnJheSwgc291cmNlT2Zmc2V0LCBkZXN0QXJyYXksIGRlc3RPZmZzZXQpIHtcbiAgICAgIGNvbnN0IGUgPSBzb3VyY2VBcnJheVtzb3VyY2VPZmZzZXQgKyAzXTtcbiAgICAgIGNvbnN0IHNjYWxlID0gTWF0aC5wb3coMi4wLCBlIC0gMTI4LjApIC8gMjU1LjA7XG4gICAgICBkZXN0QXJyYXlbZGVzdE9mZnNldCArIDBdID0gRGF0YVV0aWxzLnRvSGFsZkZsb2F0KHNvdXJjZUFycmF5W3NvdXJjZU9mZnNldCArIDBdICogc2NhbGUpO1xuICAgICAgZGVzdEFycmF5W2Rlc3RPZmZzZXQgKyAxXSA9IERhdGFVdGlscy50b0hhbGZGbG9hdChzb3VyY2VBcnJheVtzb3VyY2VPZmZzZXQgKyAxXSAqIHNjYWxlKTtcbiAgICAgIGRlc3RBcnJheVtkZXN0T2Zmc2V0ICsgMl0gPSBEYXRhVXRpbHMudG9IYWxmRmxvYXQoc291cmNlQXJyYXlbc291cmNlT2Zmc2V0ICsgMl0gKiBzY2FsZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGJ5dGVBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgYnl0ZUFycmF5LnBvcyA9IDA7XG4gICAgY29uc3QgcmdiZV9oZWFkZXJfaW5mbyA9IFJHQkVfUmVhZEhlYWRlcihieXRlQXJyYXkpO1xuXG4gICAgaWYgKFJHQkVfUkVUVVJOX0ZBSUxVUkUgIT09IHJnYmVfaGVhZGVyX2luZm8pIHtcbiAgICAgIGNvbnN0IHcgPSByZ2JlX2hlYWRlcl9pbmZvLndpZHRoLFxuICAgICAgICAgICAgaCA9IHJnYmVfaGVhZGVyX2luZm8uaGVpZ2h0LFxuICAgICAgICAgICAgaW1hZ2VfcmdiYV9kYXRhID0gUkdCRV9SZWFkUGl4ZWxzX1JMRShieXRlQXJyYXkuc3ViYXJyYXkoYnl0ZUFycmF5LnBvcyksIHcsIGgpO1xuXG4gICAgICBpZiAoUkdCRV9SRVRVUk5fRkFJTFVSRSAhPT0gaW1hZ2VfcmdiYV9kYXRhKSB7XG4gICAgICAgIGxldCBkYXRhLCBmb3JtYXQsIHR5cGU7XG4gICAgICAgIGxldCBudW1FbGVtZW50cztcblxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgIGNhc2UgVW5zaWduZWRCeXRlVHlwZTpcbiAgICAgICAgICAgIGRhdGEgPSBpbWFnZV9yZ2JhX2RhdGE7XG4gICAgICAgICAgICBmb3JtYXQgPSBSR0JFRm9ybWF0OyAvLyBoYW5kbGVkIGFzIFRIUkVFLlJHQkFGb3JtYXQgaW4gc2hhZGVyc1xuXG4gICAgICAgICAgICB0eXBlID0gVW5zaWduZWRCeXRlVHlwZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBGbG9hdFR5cGU6XG4gICAgICAgICAgICBudW1FbGVtZW50cyA9IGltYWdlX3JnYmFfZGF0YS5sZW5ndGggLyA0ICogMztcbiAgICAgICAgICAgIGNvbnN0IGZsb2F0QXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KG51bUVsZW1lbnRzKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1FbGVtZW50czsgaisrKSB7XG4gICAgICAgICAgICAgIFJHQkVCeXRlVG9SR0JGbG9hdChpbWFnZV9yZ2JhX2RhdGEsIGogKiA0LCBmbG9hdEFycmF5LCBqICogMyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGEgPSBmbG9hdEFycmF5O1xuICAgICAgICAgICAgZm9ybWF0ID0gUkdCRm9ybWF0O1xuICAgICAgICAgICAgdHlwZSA9IEZsb2F0VHlwZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBIYWxmRmxvYXRUeXBlOlxuICAgICAgICAgICAgbnVtRWxlbWVudHMgPSBpbWFnZV9yZ2JhX2RhdGEubGVuZ3RoIC8gNCAqIDM7XG4gICAgICAgICAgICBjb25zdCBoYWxmQXJyYXkgPSBuZXcgVWludDE2QXJyYXkobnVtRWxlbWVudHMpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bUVsZW1lbnRzOyBqKyspIHtcbiAgICAgICAgICAgICAgUkdCRUJ5dGVUb1JHQkhhbGYoaW1hZ2VfcmdiYV9kYXRhLCBqICogNCwgaGFsZkFycmF5LCBqICogMyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGEgPSBoYWxmQXJyYXk7XG4gICAgICAgICAgICBmb3JtYXQgPSBSR0JGb3JtYXQ7XG4gICAgICAgICAgICB0eXBlID0gSGFsZkZsb2F0VHlwZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RIUkVFLlJHQkVMb2FkZXI6IHVuc3VwcG9ydGVkIHR5cGU6ICcsIHRoaXMudHlwZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgaGVpZ2h0OiBoLFxuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgaGVhZGVyOiByZ2JlX2hlYWRlcl9pbmZvLnN0cmluZyxcbiAgICAgICAgICBnYW1tYTogcmdiZV9oZWFkZXJfaW5mby5nYW1tYSxcbiAgICAgICAgICBleHBvc3VyZTogcmdiZV9oZWFkZXJfaW5mby5leHBvc3VyZSxcbiAgICAgICAgICBmb3JtYXQ6IGZvcm1hdCxcbiAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzZXREYXRhVHlwZSh2YWx1ZSkge1xuICAgIHRoaXMudHlwZSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbG9hZCh1cmwsIG9uTG9hZCwgb25Qcm9ncmVzcywgb25FcnJvcikge1xuICAgIGZ1bmN0aW9uIG9uTG9hZENhbGxiYWNrKHRleHR1cmUsIHRleERhdGEpIHtcbiAgICAgIHN3aXRjaCAodGV4dHVyZS50eXBlKSB7XG4gICAgICAgIGNhc2UgVW5zaWduZWRCeXRlVHlwZTpcbiAgICAgICAgICB0ZXh0dXJlLmVuY29kaW5nID0gUkdCRUVuY29kaW5nO1xuICAgICAgICAgIHRleHR1cmUubWluRmlsdGVyID0gTmVhcmVzdEZpbHRlcjtcbiAgICAgICAgICB0ZXh0dXJlLm1hZ0ZpbHRlciA9IE5lYXJlc3RGaWx0ZXI7XG4gICAgICAgICAgdGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcbiAgICAgICAgICB0ZXh0dXJlLmZsaXBZID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEZsb2F0VHlwZTpcbiAgICAgICAgICB0ZXh0dXJlLmVuY29kaW5nID0gTGluZWFyRW5jb2Rpbmc7XG4gICAgICAgICAgdGV4dHVyZS5taW5GaWx0ZXIgPSBMaW5lYXJGaWx0ZXI7XG4gICAgICAgICAgdGV4dHVyZS5tYWdGaWx0ZXIgPSBMaW5lYXJGaWx0ZXI7XG4gICAgICAgICAgdGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcbiAgICAgICAgICB0ZXh0dXJlLmZsaXBZID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEhhbGZGbG9hdFR5cGU6XG4gICAgICAgICAgdGV4dHVyZS5lbmNvZGluZyA9IExpbmVhckVuY29kaW5nO1xuICAgICAgICAgIHRleHR1cmUubWluRmlsdGVyID0gTGluZWFyRmlsdGVyO1xuICAgICAgICAgIHRleHR1cmUubWFnRmlsdGVyID0gTGluZWFyRmlsdGVyO1xuICAgICAgICAgIHRleHR1cmUuZ2VuZXJhdGVNaXBtYXBzID0gZmFsc2U7XG4gICAgICAgICAgdGV4dHVyZS5mbGlwWSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChvbkxvYWQpIG9uTG9hZCh0ZXh0dXJlLCB0ZXhEYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIubG9hZCh1cmwsIG9uTG9hZENhbGxiYWNrLCBvblByb2dyZXNzLCBvbkVycm9yKTtcbiAgfVxuXG59XG5cbmV4cG9ydCB7IFJHQkVMb2FkZXIgfTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/jsm/loaders/RGBELoader.js\n");

/***/ }),

/***/ "./src/public/textures/equirectangular/pedestrian_overpass_1k.hdr":
/*!************************************************************************!*\
  !*** ./src/public/textures/equirectangular/pedestrian_overpass_1k.hdr ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"270ee18c3df5075c1272d98d5bcad49a.hdr\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcHVibGljL3RleHR1cmVzL2VxdWlyZWN0YW5ndWxhci9wZWRlc3RyaWFuX292ZXJwYXNzXzFrLmhkci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9wdWJsaWMvdGV4dHVyZXMvZXF1aXJlY3Rhbmd1bGFyL3BlZGVzdHJpYW5fb3ZlcnBhc3NfMWsuaGRyP2U1ODgiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjI3MGVlMThjM2RmNTA3NWMxMjcyZDk4ZDViY2FkNDlhLmhkclwiOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/public/textures/equirectangular/pedestrian_overpass_1k.hdr\n");

/***/ }),

/***/ "./src/router.tsx":
/*!************************!*\
  !*** ./src/router.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _containers_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/Home */ \"./src/containers/Home/index.tsx\");\n/* harmony import */ var _containers_NoMatch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/NoMatch */ \"./src/containers/NoMatch/index.tsx\");\n/* harmony import */ var _containers_Test__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/Test */ \"./src/containers/Test/index.tsx\");\n\r\n\r\n\r\n\r\n\r\nconst Router = () => {\r\n    const routes = [\r\n        {\r\n            path: '/',\r\n            com: _containers_Home__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\r\n        },\r\n        {\r\n            path: '/test',\r\n            com: _containers_Test__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\r\n        },\r\n        {\r\n            com: _containers_NoMatch__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\r\n        }\r\n    ];\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"HashRouter\"], null,\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Switch\"], null, routes.map(({ path, com }) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], { key: path || 'no-match', exact: true, path: path, component: com })))));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Router);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcm91dGVyLnRzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9yb3V0ZXIudHN4PzIzYzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgSGFzaFJvdXRlciwgU3dpdGNoLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgSG9tZSBmcm9tICcuL2NvbnRhaW5lcnMvSG9tZSc7XHJcbmltcG9ydCBOb01hdGNoIGZyb20gJy4vY29udGFpbmVycy9Ob01hdGNoJztcclxuaW1wb3J0IFRlc3QgZnJvbSAnLi9jb250YWluZXJzL1Rlc3QnO1xyXG5jb25zdCBSb3V0ZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByb3V0ZXMgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnLycsXHJcbiAgICAgICAgICAgIGNvbTogSG9tZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnL3Rlc3QnLFxyXG4gICAgICAgICAgICBjb206IFRlc3RcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29tOiBOb01hdGNoXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChIYXNoUm91dGVyLCBudWxsLFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3dpdGNoLCBudWxsLCByb3V0ZXMubWFwKCh7IHBhdGgsIGNvbSB9KSA9PiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlLCB7IGtleTogcGF0aCB8fCAnbm8tbWF0Y2gnLCBleGFjdDogdHJ1ZSwgcGF0aDogcGF0aCwgY29tcG9uZW50OiBjb20gfSkpKSkpO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXI7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/router.tsx\n");

/***/ })

/******/ });