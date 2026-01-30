import { Injectable } from "@angular/core";
import { Workflow } from "./workflow.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class WorkflowService{
    private workflows$=new BehaviorSubject<Workflow[]>([]);
    getWorkflows():Observable<Workflow[]>{return this.workflows$.asObservable()}
    addWorkflow(workflow:Workflow){
        const current =this.workflows$.getValue();
        this.workflows$.next([...current, workflow])
    }
    updateWorkflow(updated:Workflow){
        const current =this.workflows$.getValue().map(w=>w.id===updated.id?updated:w)
    this.workflows$.next(current);
    }
    deleteWorkflow(id:number){
        const current=this.workflows$.getValue().filter(w=>w.id==id);
        this.workflows$.next(current)
    }
}