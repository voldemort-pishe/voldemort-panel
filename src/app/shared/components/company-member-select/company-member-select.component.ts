import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CompanyMemberService } from '@app/core';
import { CompanyMemberContentModel } from '@app/shared/model/company-member/company-member-vm.model';

@Component({
  selector: 'anms-company-member-select',
  templateUrl: './company-member-select.component.html',
  styleUrls: ['./company-member-select.component.scss']
})
export class CompanyMemberSelectComponent implements OnInit {

  @Input() label: string = 'اعضا';
  @Output() selectedMembersChange: EventEmitter<CompanyMemberContentModel[]> = new EventEmitter<CompanyMemberContentModel[]>();
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  memberCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  matchedMembers$: Observable<CompanyMemberContentModel[]>;
  selectedMembers: CompanyMemberContentModel[] = [];

  constructor(private companyMemberService: CompanyMemberService) { }

  ngOnInit() {
    this.matchedMembers$ = this.memberCtrl.valueChanges.pipe(
      startWith(null),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.filter(value))
    );
  }

  filter(email?: string): Observable<CompanyMemberContentModel[]> {
    return this.companyMemberService.getList(email)
      .pipe(map(r => r.success ? r.data.content : []));
  }

  removeMember(member: CompanyMemberContentModel): void {
    this.selectedMembers.splice(this.selectedMembers.indexOf(member, 0), 1);
    this.onSelectedMembersChanged();
  }

  onMemberSelected(event: MatAutocompleteSelectedEvent): void {
    this.searchInput.nativeElement.value = '';
    const member: CompanyMemberContentModel = event.option.value;
    if (this.selectedMembers.some(m => m.include.user.id === member.include.user.id))
      return;

    this.selectedMembers.push(member);
    this.onSelectedMembersChanged();
  }

  private onSelectedMembersChanged(): void {
    this.selectedMembersChange.emit(this.selectedMembers);
  }
}
