<?php

namespace App\Http\Controllers;
use App\Http\Requests\EventRequest;
use App\Models\Event;

class EventController extends Controller
{
    public function ajouterEvent(EventRequest $request){
         $request->validated();
         $event = new Event();
         $event->titre = $request->titre;
         $event->debut_de_event = $request->debut_de_event;
         $event->fin_de_event = $request->fin_de_event;
         $event->save();
         return response()->json('Event created successfully');
    }
    public function getallevent(){
        $data = Event::all();
       return response()->json($data);;
    }
}
