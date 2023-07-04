<?php

use App\Http\Controllers\ActorsController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\RequerimentsController;
use App\Http\Controllers\UseCaseController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/projects', function () {
    return view('projects');
});
Route::get('/projects/create', function () {
    return view('projects.createProject');
});
Route::get('/projects/project', function () {
    return view('showProject');
});
Route::post('/projects/store', [ProjectsController::class, 'store']) -> name('projectsStore');
Route::get('/projects/request', [ProjectsController::class, 'index']) -> name('projectsRequest');
Route::delete('/projects/{id}', [ProjectsController::class, 'destroy']) -> name('projectsDelete');

Route::get('/projects/{id}', [ProjectsController::class, 'show']) -> name('projectShow');
Route::get('/projects/request/{id}', [ProjectsController::class, 'showProject']) -> name('projectRequest');
Route::post('/projects/edit/{id}', [ProjectsController::class, 'editProject']) -> name('projectEdit');

Route::get('/projects/{id}/requeriments', [RequerimentsController::class, 'main']) -> name('projectShow');
Route::get('/projects/{id}/requeriments/f/get', [RequerimentsController::class, 'indexRF']) -> name('projectRequerimentsFunctional');
Route::get('/projects/{id}/requeriments/f/get/all', [RequerimentsController::class, 'indexRFAll']) -> name('projectRequerimentsFunctionalAll');
Route::get('/projects/{id}/requeriments/nf/get', [RequerimentsController::class, 'indexRNF']) -> name('projectRequerimentsFunctional');
Route::get('/projects/{id}/requeriments/create', [RequerimentsController::class, 'create']) -> name('projectRequerimentCreate');
Route::post('/projects/{id}/requeriments/store/f', [RequerimentsController::class, 'storeFunctional']) -> name('projectRequerimentStoreF');
Route::post('/projects/{id}/requeriments/store/nf', [RequerimentsController::class, 'storeNFunctional']) -> name('projectRequerimentStoreNF');
Route::delete('/requeriments/f/{id}', [RequerimentsController::class, 'destroyF']) -> name('projectsRequerimentFDelete');
Route::delete('/requeriments/nf/{id}', [RequerimentsController::class, 'destroyNF']) -> name('projectsRequerimentNFDelete');
Route::post('/requeriments/edit/f/{id}', [RequerimentsController::class, 'editRequerimentF']) -> name('projectEditRequerimentF');
Route::post('/requeriments/edit/nf/{id}', [RequerimentsController::class, 'editRequerimentNF']) -> name('projectEditRequerimentNF');
Route::post('/requeriments/edit/f/{id}/caseuse', [RequerimentsController::class, 'editRequerimentFUseCase']) -> name('projectEditRequerimentFUseCase');


Route::get('/projects/{id}/actors', [ActorsController::class, 'main']) -> name('projectActors');
Route::get('/projects/actors/get/{id}', [ActorsController::class, 'index']) -> name('projectActorsIndex');
Route::delete('/actors/{id}', [ActorsController::class, 'destroy']) -> name('projectActorsDestroy');
Route::get('/actors/{id}', [ActorsController::class, 'indexAll']) -> name('projectActorsIndexAll');
Route::post('/actors/edit/{id}', [ActorsController::class, 'edit']) -> name('projectEditActor');
Route::get('/projects/{id}/actors/create', [ActorsController::class, 'create']) -> name('projectActorsCreate');
Route::post('/projects/{id}/actors/store', [ActorsController::class, 'store']) -> name('projectActorsStore');

Route::get('/projects/{id}/usecases', [UseCaseController::class, 'main']) -> name('projectUseCase');
Route::get('/projects/{id}/usecases/create', [UseCaseController::class, 'create']) -> name('projectUseCaseCreate');
Route::post('/projects/{id}/usecases/store', [UseCaseController::class, 'store']) -> name('projectUseCaseStore');
Route::get('/projects/{id}/usecases/get', [UseCaseController::class, 'index']) -> name('projectUseCaseIndex');
Route::get('/requeriments/get/f/{id}', [UseCaseController::class, 'getRFByCaseUse']) -> name('projectGetRFByCaseUse');
Route::delete('/usecases/{id}', [UseCaseController::class, 'destroy']) -> name('projectUseCaseDestroy');
Route::get('/projects/{id}/usecases/edit/{idUseCase}', [UseCaseController::class, 'edit']) -> name('projectUseCaseIndex');
Route::get('/usecases/{id}', [UseCaseController::class, 'getUseCaseById']) -> name('projectUseCaseById');
Route::post('/usecases/{id}/update', [UseCaseController::class, 'update']) -> name('updateUseCase');




Route::get('/info', function () {
    return view('info');
});



