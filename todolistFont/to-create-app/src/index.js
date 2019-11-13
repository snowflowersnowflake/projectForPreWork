import React, { Component } from 'react';
import styles from "./css/";


function LevelRender(props) {
    const task_level=props.task_level
    if (task_level===1){
        return <span>hight</span>
    } else if (task_level===2){
        return <span> very hight</span>
    } else{
        return<span>normal</span>
    }

}

function StatusRender(props) {
    const task_status=props.task_status;
    if (task_status===1){
        return <span>已完成</span>
    } else if (task_status===2){
        return <span> 已过期</span>
    } else{
        return<span>未完成</span>
    }
}

function StatusFinishRender(props) {
    const task_status=props.task_finish_status;
    if (task_status===0){
        return isshow
    }

}

class mycls extends React.Component {

    constructor(props) {
        super(props);
        this.state = {type: 0, lastGistUrl: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addItemClick = this.addItemClick.bind(this);
        this.editItemClick = this.editItemClick.bind(this);
    }


    deleteItemClick(index, id) {
        const list = [...this.state.data];
        list.splice(index, 1);
        this.serverRequest = $.ajax({
            url: 'http://127.0.0.1:8000/task/' + id,
            type: 'DELETE',
            success: function () {
                this.setState({
                    data: list
                })
            }.bind(this)
        })
    }


    addPageClick() {
        this.setState({
            type: 1,
            detailType: 1,
            level: 0,
            title: "",
            content: null,
            id: "",
            index: "",
        })
    }

    indexPageClick() {
        this.setState({
            type: 0
        })
    }

    detailPageClick(index, id, title, content, priority_level) {
        this.setState({
            type: 4,
            level: priority_level,
            title: title,
            content: content,
            id: id,
            index: index,
            detailType: 4
        })

    }


    finishItemClick(index, id) {

        const list = [...this.state.data];
        var detail = list[index]
        detail['status'] = 1;
        console.log(index)


        this.serverRequest = $.ajax({
            url: 'http://127.0.0.1:8000/task/' + id + '/',
            type: 'PATCH',
            data: {status: 1},
            success: function () {
                list.splice(index, detail);

                this.setState({
                    type: 0,
                    data: list
                })

            }.bind(this)
        })

    }

    editPageClick(index, id, title, content,priority_level) {
        this.setState({
            type: 1,
            level: priority_level,
            title: title,
            content: content,
            id: id,
            index: index,
            detailType: 0,
        })

    }


    editItemClick(event) {
        var data = {
            "title": this.state.title,
            "content": this.state.content,
            "priority_level": this.state.level,
        };
        var list =this.state.data;
        var datainfo=list[this.state.index]
        datainfo['title']=this.state.title
        datainfo['content']=this.state.content
        datainfo['priority_level']=this.state.priority_level
        list.splice(this.state.index,datainfo)

        this.serverRequest = $.ajax({
            url: 'http://127.0.0.1:8000/task/' + this.state.id + '/',

            type: 'PATCH',
            data: data,
            success: function () {
                this.setState({
                    type: 0,
                    data: list
                })
            }.bind(this)
        })
    }





        addItemClick(event)
        {
            var level = this.state.level;
            if (level === undefined) {
                level = 0
            }

            var data = {
                "title": this.state.title,
                "content": this.state.content,
                "priority_level": level,
            };

            const list = [...this.state.data];
                this.serverRequest = $.post(this.props.source, data, function (result) {
                    list.push(data)
                    this.setState({
                        type: 0,
                        data: list
                    });
                }.bind(this));
            window.location.reload(true);

        }


  handleInputChange(event) {
    const target = event.target;
    const value =  target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
      this.serverRequest = $.get(this.props.source, function (result) {
      this.setState({
          type:0,
        data:result,
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {

      var type=this.state.type;
      if(type===0) {
      var data=this.state.data;
       var siteElements=[];
      if (data!=undefined) {
      data.forEach((item,index)=>{

               siteElements.push(
               <tr>
                            <td>{ item.title }</td>
                            <td><LevelRender task_level={ item.priority_level }/></td>
                            <td><StatusRender task_status={ item.status }/></td>
                            <td><div className="btn-group">
                                    <button type="button" className={["btn btn-default delete ", item.status!=0?"isshow":null].join(' ')}  onClick={this.editPageClick.bind(this,index,item.id,item.title,item.content,item.priority_level)}>edit</button>
                                    <button type="button" className="btn btn-default delete"  onClick={this.deleteItemClick.bind(this,index,item.id)}>delete</button>
                                    <button type="button" className="btn btn-default delete"  onClick={this.detailPageClick.bind(this,index,item.id,item.title,item.content,item.priority_level)}>detail</button>
                                    <button type="button" className={["btn btn-default delete ", item.status!=0?"isshow":null].join(' ')} onClick={this.finishItemClick.bind(this,index,item.id)}>finish</button>

                            </div></td>
                        </tr>
            )
      })
  }
  this.state.template=<table className="table table-striped">
                        <caption></caption>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Priority Level</th>
                            <th>Status</th>
                            <th>Option</th>
                        </tr>
                        </thead>
                        <tbody>
                       {siteElements}                      </tbody>
                    </table>;


    return (
        <div>
      <div className="row" >
    <nav className="navbar navbar-default" role="navigation" >
        <div className="container-fluid">
            <div className="navbar-header logo_left" >
                <a className="navbar-brand" href="#">todolist</a>
            </div>
            <div>
                <ul className="nav navbar-nav">
                    <li className="active"  onClick={this.indexPageClick.bind(this)}><a href="#">list</a></li>
                    <li onClick={this.addPageClick.bind(this)}><a href="#">add</a></li>
                </ul>
            </div>
        </div>
    </nav>
</div>

<div className="container">

    <div className="panel panel-default">
        <div className="panel-body">  <table className="table table-striped">
                        <caption></caption>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Priority Level</th>
                            <th>Status</th>
                            <th>Option</th>
                        </tr>
                        </thead>
                        <tbody>
                       {siteElements}                      </tbody>
                    </table>        </div>
    </div>
</div></div>


    );
  }else if (type===1) {

          return (
   <div>
      <div className="row" >
    <nav className="navbar navbar-default" role="navigation" >
        <div className="container-fluid">
            <div className="navbar-header logo_left" >
                <a className="navbar-brand" href="#">todolist</a>
            </div>

            <div>
                <ul className="nav navbar-nav">
                    <li onClick={this.indexPageClick.bind(this)}><a href="#">list</a></li>
                    <li className="active" onClick={this.addPageClick.bind(this)}><a href="#">add</a></li>
                </ul>
            </div>
        </div>

    </nav>
  </div>

              <div className="container">
                    <div className="panel panel-default">
    <div className="panel-heading">

		<h3 className="panel-title" className={ this.state.detailType!=1?"isshow":null}>
			添加事件
		</h3>
		<h3 className="panel-title" className={ this.state.detailType!=0?"isshow":null}>
			编辑事件
		</h3>

	</div>	<div className="panel-body">

                        		<div className="form-horizontal">
                                      <div className="form-group">
    <label for="firstname" className="col-sm-2 control-label">title</label>
    <div className="col-sm-10">
        <input type="text" className="form-control" name="title" id="title" onChange= {this.handleInputChange}  value={this.state.title}/>

    </div>
  </div>

                                              <div className="form-group">
    <label for="lastname" className="col-sm-2 control-label">Content</label>
    <div className="col-sm-10">
        <textarea   className="col-sm-12" name="content" id="content" onChange= {this.handleInputChange}   rows="10">{this.state.content}</textarea>
    </div>
  </div>

                          <div className="form-group">
    <label for="lastname" className="col-sm-2 control-label">Prival Level</label>
                                <div className="col-sm-10">
    <select className="form-control" value={this.state.level} name="level" onChange={this.handleInputChange}>
      <option value="0" selected>Noraml</option>
      <option value="1">Hight</option>
      <option value="2">Very Hight</option>

    </select>
                                </div>
  </div>



  <div className="form-group">
    <div className="col-sm-offset-2 col-sm-10">
        <button className={["btn btn-default ", this.state.detailType!=1?"isshow":null].join(' ')} onClick={this.addItemClick}>add</button>
        <button className={["btn btn-default ", this.state.detailType!=0?"isshow":null].join(' ')} onClick={this.editItemClick}>edit</button>
    </div>
  </div>
                                </div>
                    </div>


                    </div>
              </div>



          </div>);

      }else{
          return (  <div>

      <div className="row" >
    <nav className="navbar navbar-default" role="navigation" >
        <div className="container-fluid">
            <div className="navbar-header logo_left" >
                <a className="navbar-brand" href="#">todolist</a>
            </div>
            <div>
                <ul className="nav navbar-nav">
                                <li onClick={this.indexPageClick.bind(this)}><a href="#">list</a></li>
                    <li  onClick={this.addPageClick.bind(this)}><a href="#">add</a></li>
                </ul>
            </div>
        </div>
    </nav>
</div>

<div className="container">

    <div className="panel panel-default">
<div className="panel-heading">
		<h3 className="panel-title">
			事件详情
		</h3>
	</div>
	<div className="panel-body">
		<div className="form-horizontal">
  <div className="form-group">
    <label for="firstname" className="col-sm-2 control-label">title</label>
    <div className="col-sm-10">
        <p>{this.state.title}</p>
    </div>
  </div>
  <div className="form-group">

  </div>

              <div className="form-group">
    <label for="lastname" className="col-sm-2 control-label">Content</label>
    <div className="col-sm-10">
        <p >{this.state.content}</p>
    </div>
  </div>

                          <div className="form-group">
    <label for="lastname" className="col-sm-2 control-label">Prival Level</label>
                                <div className="col-sm-10">
                                    <p ><LevelRender task_level={ this.state.level }/></p>

                                </div>
  </div>

                                      <div className="form-group">
    <label for="lastname" className="col-sm-2 control-label">Status</label>
                                <div className="col-sm-10">
                                    <p ><StatusRender task_status={ this.state.status }/></p>

                                </div>
  </div>


</div>
	</div>
    </div>
</div>

  </div>)
      }

  }

}

ReactDOM.render(
  <mycls source="http://127.0.0.1:8000/task/" />,
  document.getElementById('body')
);